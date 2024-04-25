
using Courses_App.BL;
using Courses_App.BL.Validators;
using Courses_App.BL.VM;
using Courses_App.DAL.Database;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Courses_App.BL.Services;
using Microsoft.AspNetCore.WebUtilities;
using OnlineExamAPI.BL.Auto_mapper;
using AutoMapper;
using Courses_App.BL.Interfaces;
using Courses_App.DAL.Models;
using WebApplication12.BL.helper;
using Courses_App.BL.Reposatory;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Mvc;
using Courses_App.BL.MiddleWare;
using Stripe;
using JsonOptions = Microsoft.AspNetCore.Http.Json.JsonOptions;
using Microsoft.AspNetCore.Builder;



namespace Courses_App
{
    public class DateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String && reader.TryGetDateTime(out DateTime date))
            {
                return date;
            }
            throw new JsonException();
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ssZ"));
        }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddControllers().AddJsonOptions(opt =>
            //{
            //    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            //    opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

            //});

            // Add services to the container.
            builder.Services.AddAuthorization();


            builder.Services.Configure<JsonOptions>(options =>
            {
                options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
               


            });


            builder.Services.AddValidatorsFromAssemblyContaining<Program>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IValidator<LoginVM>, LoginValidator>();
            builder.Services.AddScoped<ICourse, CourseRepo>();
            builder.Services.AddScoped<IInstructor, InstructorRepo>();
            builder.Services.AddScoped<ICourseBranches, CourseBranchesRepo>();
            builder.Services.AddScoped<IBranch, BranchRepo>();
            builder.Services.AddScoped<IOrder, OrderRepo>();
            builder.Services.AddScoped<IPayment, PaymentRepo>();
            builder.Services.AddScoped<IStudent, StudentRepo>();
            builder.Services.AddScoped<IStudentCourse, StudentCourseRepo>();
            builder.Services.AddScoped<UserManager<IdentityUser>>();
            builder.Services.AddScoped<SignInManager<IdentityUser>>();
            builder.Services.AddAutoMapper(opt => opt.AddProfile(new DomainProfile()));
            builder.Services.AddDbContextPool<DataContext>(opt =>
            {
                opt.UseSqlServer(builder.Configuration.GetConnectionString("CoursesApp"));

            });
            builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<DataContext>()


      .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>(TokenOptions.DefaultProvider);
            builder.Services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(opt =>
                {
                    opt.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
          

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Files")),
                RequestPath = "/Resources"
            });
            app.UseCors();
            app.UseMiddleware<ExceptionMiddleWare>();
            app.UseStatusCodePagesWithReExecute("/Error/{0}");

          
            app.MapGet("/Error/{StatusCode}", (int StatusCode) =>
            {
                var error = new Error(StatusCode);
                var options = new JsonSerializerOptions
                {

                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var jsonString = JsonSerializer.Serialize(error, options);
                return jsonString;
            }).ExcludeFromDescription();

            app.MapGet("/NotFound", async (string id, UserManager<IdentityUser> usermanager) =>
            {
                var data = await usermanager.FindByIdAsync(id);
                return data.ConcurrencyStamp;

            });


            app.MapGet("/alluser", async (UserManager<IdentityUser> usermanager) =>
            {
                var data = usermanager.Users.Select(a => a);
                return new Response<IQueryable<IdentityUser>> { code = 200, message = "users retreived successfully", data = data };
            });


            app.MapGet("/GetUserById/{id}", async (string id, UserManager<IdentityUser> usermanager) =>
            {
                var data = usermanager.Users.Where(a => a.Id == id).FirstOrDefault();
                return new Response<IdentityUser> { code = 200, message = "user retreived successfully", data = data };


            });


            app.MapGet("/GetCurrentUser/{userid}", async (string userid, UserManager<IdentityUser> UserManager) =>
            {
                var user = await UserManager.FindByIdAsync(userid);
                IList<string> userRoles = await UserManager.GetRolesAsync(user);

                return new Response<IdentityUser> { code = 200, message = "data retreieved successfully", messages = userRoles.ToArray(), data = user };
            });
            app.MapGet("/GetAdmins", async (UserManager<IdentityUser> usermanager) =>
            {
                var data = usermanager.Users.Select(a => a); ;
            var result =new  List<IdentityUser>();
                foreach (var item in data)
                {
                    var roles = await usermanager.GetRolesAsync(item);
                    if (roles.Count != 0)
                    {
                        result.Add(item);
                    }
                }
                return new Response<IEnumerable<IdentityUser>> { code = 200, message = "data retreieved successfully", data = result };


            });
      
            app.MapPost("/Login", async (LoginVM login, IValidator<LoginVM> validator, UserManager<IdentityUser> UserManager, SignInManager<IdentityUser> SignInManager) =>
            {

                var result = await validator.ValidateAsync(login);
                if (result.IsValid)
                {
                    try
                    {
                        var signresult = await SignInManager.PasswordSignInAsync(login.Email, login.password, login.rememberme, false);
                        if (signresult.Succeeded)
                        {
                            var user = await UserManager.FindByEmailAsync(login.Email)
                            ;
                            return new Response<string> { code = 200, message = "user logined successfully", data = user.Id };
                        }
                        else
                        {
                            return new Response<string> { code = 400, message = "invalid username or password Attempt" };
                        }

                    }
                    catch (Exception ex)
                    {
                        return new Response<string> { code = 400, message = "invalid username or password Attempt" };
                    }
                }
                else
                {

                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };

                }






            });


            app.MapPost("/isEmailExist", async (ForgetPasswordVM forgetPassword, UserManager<IdentityUser> usermanager) =>
            {
                var user = await usermanager.FindByEmailAsync(forgetPassword.Email);
                Console.WriteLine(forgetPassword.Email);
                if (user == null)
                {
                    return new Response<string> { code = 200, message = "email not exist" };

                }
                else
                {
                    return new Response<string> { code = 400, message = "Email Already Taken", data = forgetPassword.Email };

                }
            });
            app.MapPost("/signup", async (Signup signup, IValidator<Signup> validator, UserManager<IdentityUser> usermanager) =>
            {
                var result = await validator.ValidateAsync(signup);
                if (result.IsValid)
                {
                    try
                    {
                        var user = new IdentityUser();
                        user.Email = signup.email;
                        user.UserName = signup.email;
                        user.PhoneNumber = signup.phone;


                        var creationresult = await usermanager.CreateAsync(user, signup.password);
                        if (creationresult.Succeeded)
                        {
                            return new Response<string> { code = 200, message = "user signedup successfully" };
                        }
                        else
                        {
                            int counter = 0;
                            var message = new string[creationresult.Errors.Count()]; ;
                            foreach (var error in creationresult.Errors)
                            {

                                message[counter] = error.Description;
                                counter++;
                            }


                            return new Response<string> { code = 400, messages = message };

                        }

                    }
                    catch (Exception ex)
                    {
                        return new Response<string> { code = 400, message = "invalid Operation" };
                    }
                }
                else
                {

                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };

                }

            });
            app.MapPost("/ForgetPassword", async (ForgetPasswordVM forgetPassword, IValidator<ForgetPasswordVM> validator, UserManager<IdentityUser> usermanager) =>
            {
                var result = await validator.ValidateAsync(forgetPassword);
                if (result.IsValid)
                {
                    var user = await usermanager.FindByEmailAsync(forgetPassword.Email);

                    if (user != null)
                    {

                        var token = await usermanager.GeneratePasswordResetTokenAsync(user);
                        var encodeToken = Encoding.UTF8.GetBytes(token);
                        var newToken = WebEncoders.Base64UrlEncode(encodeToken);

                        var email = $"http://localhost:4200/Auth/ResetPassword?token={newToken}&email={forgetPassword.Email}";

                        var state = MailSender.sendmail(forgetPassword.Email, email);
                        if (state.Result)
                        {
                            return new Response<string> { code = 200, message = "valid email", data = newToken };
                        }
                        else
                        {
                            return new Response<string> { code = 200, message = "Something wrong", data = newToken };
                        }


                    }
                    else
                    {
                        return new Response<string> { code = 400, message = "invalid email" };
                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };

                }
            });
            app.MapPost("/ResetPassword", async (ResetpasswordVM resetpassword, IValidator<ResetpasswordVM> validator, UserManager<IdentityUser> usermanager) =>
            {
                var result = await validator.ValidateAsync(resetpassword);
                if (result.IsValid)
                {
                    var user = await usermanager.FindByEmailAsync(resetpassword.email);

                    if (user != null)
                    {
                        var newToken = WebEncoders.Base64UrlDecode(resetpassword.token);
                        var encodeToken = Encoding.UTF8.GetString(newToken);
                        var results = await usermanager.ResetPasswordAsync(user, encodeToken, resetpassword.password);

                        if (results.Succeeded)
                        {
                            return new Response<string> { code = 200, message = "Successful reset" };
                        }
                        else
                        {
                            var Messages = new string[results.Errors.Count()];
                            var counter = 0;
                            foreach (var item in results.Errors)
                            {
                                Messages[counter] = item.Description;
                                counter++;
                            }

                            return new Response<string> { code = 400, messages = Messages };
                        }



                    }
                    else
                    {
                        return new Response<string> { code = 400, message = "invalid Email" };
                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }
            });


            /* Course Action*/
            app.MapGet("/Course/GetAll", (ICourse course, IMapper mapper) =>
            {


                var data = course.getAll();
                var result = mapper.Map<IEnumerable<CourseVM>>(data);
                return new Response<IEnumerable<CourseVM>> { code = 200, message = "data retrived", data = result };

            });
            app.MapPost("/Course/Create", (CourseVM crs, ICourse course, IMapper mapper, IValidator<CourseVM> validator, HttpContext he) =>
            {
                var result = validator.Validate(crs);
                if (result.IsValid)
                {
                    try
                    {



                        crs.imgname = FileUploader.upload("/Files", crs.Img);


                        var data = mapper.Map<Course>(crs);
                        course.Add(data);
                        return new Response<string> { code = 200, message = "Course Created Successfully" };
                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }


            }).Accepts<CourseVM>("multipart/form-data"); ;

            app.MapPut("/Course/Update", (ICourse course, IMapper mapper, CourseVM crs, IValidator<CourseVM> validator) =>
            {
                var result = validator.Validate(crs);
                if (result.IsValid)
                {
                    try
                    {



                        crs.imgname = FileUploader.upload("/Files", crs.Img);

                        var data = mapper.Map<Course>(crs);
                        course.update(data);
                        return new Response<string> { code = 200, message = "Course updated Successfully" };
                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }


            }).Accepts<CourseVM>("multipart/form-data"); ;


            app.MapDelete("/Course/Delete/{id}", (int id, ICourse crs) =>
            {
                try
                {
                    crs.delete(id);
                    return new Response<string> { code = 200, message = "Course Deleted successflly" };
                }
                catch (Exception ex)
                {
                    return new Response<string> { code = 400, message = ex.Message };
                }

            });

            app.MapGet("/Course/Details/{id}", (int id, ICourse crs, IMapper mapper) =>
            {
                try
                {
                    var data = crs.getbyid(id);
                    var result = mapper.Map<CourseVM>(data);

                    return new Response<CourseVM> { code = 200, message = "data retreived successflly", data = result };
                }
                catch (Exception ex)
                {
                    return new Response<CourseVM> { code = 400, message = ex.Message, data = null };

                }

            });



            /*course Action*/

            /*instructor Action*/
            app.MapGet("/Instructor/GetAll", (IInstructor instructor, IMapper mapper) =>
            {
                var data = instructor.GetAll();
                var result = mapper.Map<IEnumerable<instructorVM>>(data);
                return new Response<IEnumerable<instructorVM>> { code = 200, message = "data retrived", data = result };

            });

            app.MapPost("/Instructor/Create", (instructorVM instructor, IInstructor IInstructor, IMapper mapper, IValidator<instructorVM> validator) =>
            {
                var result = validator.Validate(instructor);
                if (result.IsValid)
                {
                    try
                    {



                        instructor.imgname = FileUploader.upload("/Files", instructor.img);
                        instructor.cvname = FileUploader.upload("/Files", instructor.cv);

                        var data = mapper.Map<instructor>(instructor);
                        IInstructor.Add(data);
                        return new Response<string> { code = 200, message = "Instructor Created Successfully" };
                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }


            }).Accepts<CourseVM>("multipart/form-data"); ;


            app.MapPut("/Instructor/Update", (instructorVM instructor, IInstructor IInstructor, IMapper mapper, IValidator<instructorVM> validator) =>
            {
                var result = validator.Validate(instructor);
                if (result.IsValid)
                {
                    try
                    {



                        instructor.imgname = FileUploader.upload("/Files", instructor.img);
                        instructor.cvname = FileUploader.upload("/Files", instructor.cv);

                        var data = mapper.Map<instructor>(instructor);
                        IInstructor.Update(data);
                        return new Response<string> { code = 200, message = "Instructor Updated Successfully" };
                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }


            }).Accepts<CourseVM>("multipart/form-data"); ;

            app.MapDelete("/Instructor/Delete/{id}", (int id, IInstructor instructor, IMapper mapper) =>
            {
                try
                {
                    instructor.Delete(id);
                    return new Response<string> { code = 200, message = "Instructor deleted successfully" };
                }
                catch (Exception ex)
                {
                    return new Response<string> { code = 400, message = ex.Message };

                }

            });
            app.MapGet("/Instructor/GetById/{id}", (int id, IInstructor instructor, IMapper mapper) =>
            {
                try
                {
                    var data = instructor.GetById(id);
                    var result = mapper.Map<instructorVM>(data);
                    return new Response<instructorVM> { code = 200, message = "Instructor retreieved successfully ", data = result };
                }
                catch (Exception ex)
                {
                    return new Response<instructorVM> { code = 400, message = ex.Message, data = null };

                }

            });

            /*end instructor Actions*/

            /*start branch Actions*/
            app.MapGet("/Branch/GetAll", (IBranch Branch, IMapper mapper) =>
            {
                var data = Branch.GetAll();
                var result = mapper.Map<IEnumerable<BranchVM>>(data);
                return new Response<IEnumerable<BranchVM>> { code = 200, message = "data retrived", data = result };

            });

            app.MapPost("/Branch/Create", (BranchVM branch, IBranch Ibranch, IMapper mapper, IValidator<BranchVM> validator) =>
            {
                var result = validator.Validate(branch);
                if (result.IsValid)
                {
                    try
                    {

                        var data = mapper.Map<Branch>(branch);
                        Ibranch.Add(data);
                        return new Response<string> { code = 200, message = "Branch Created Successfully" };
                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }


            }).Accepts<BranchVM>("application/json");


            app.MapPut("/Branch/Update", (BranchVM branch, IBranch Ibranch, IMapper mapper, IValidator<BranchVM> validator) =>
            {
                var result = validator.Validate(branch);
                if (result.IsValid)
                {
                    try
                    {

                        var data = mapper.Map<Branch>(branch);
                        Ibranch.Update(data);
                        return new Response<string> { code = 200, message = "Branch Updated Successfully" };
                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }


            }).Accepts<BranchVM>("application/json");



            app.MapDelete("/Branch/Delete/{id}", (int id, IBranch branch, IMapper mapper) =>
            {
                try
                {
                    branch.Delete(id);
                    return new Response<string> { code = 200, message = "Branch deleted successfully" };
                }
                catch (Exception ex)
                {
                    return new Response<string> { code = 400, message = ex.Message };

                }

            });
            app.MapGet("/Branch/GetById/{id}", (int id, IBranch branch, IMapper mapper) =>
            {
                try
                {
                    var data = branch.GetByID(id);
                    var result = mapper.Map<BranchVM>(data);
                    return new Response<BranchVM> { code = 200, message = "Branch retreieved successfully ", data = result };
                }
                catch (Exception ex)
                {
                    return new Response<BranchVM> { code = 400, message = ex.Message, data = null };

                }

            });
            /*end Branch Actions*/

            /*start courseBranch Actions*/
            app.MapPost("/CourseBranches/Create", (CourseBranchesVM crsbranch, ICourseBranches Icrsbranch, IMapper mapper, IValidator<CourseBranchesVM> validator) =>
            {
                var result = validator.Validate(crsbranch);
                if (result.IsValid)
                {
                    try
                    {
                        if (Icrsbranch.getcount(crsbranch.courseid, crsbranch.branchid) > 0)
                        {
                            return new Response<string> { code = 400, message = "Course Already Assigned To Branch" };

                        }
                        else
                        {
                            var data = mapper.Map<CourseBranches>(crsbranch);
                            Icrsbranch.Add(data);
                            return new Response<string> { code = 200, message = "Course Assigned To Branch Successfully" };
                        }

                    }
                    catch (Exception e)
                    {
                        return new Response<string> { code = 400, message = e.InnerException.Message };

                    }
                }
                else
                {
                    var Message = new string[result.Errors.Count()];
                    var counter = 0;
                    foreach (var item in result.Errors)
                    {
                        Message[counter] = item.ErrorMessage;
                        counter++;
                    }

                    return new Response<string> { code = 400, messages = Message };
                }

            });


            app.MapGet("CourseBranches/GetById/{courseid}", ([FromRoute] int courseid, IMapper mapper, ICourseBranches courseBranches) =>
            {
                try
                {
                    var data = courseBranches.GetById(courseid);
                    var result = mapper.Map<IEnumerable<CourseBranchesVM>>(data);
                    return new Response<IEnumerable<CourseBranchesVM>> { code = 200, message = "data retrieved Successfully", data = result };

                }
                catch (Exception e)
                {
                    return new Response<IEnumerable<CourseBranchesVM>> { code = 400, message = e.InnerException.Message, data = null };

                }

            });


            app.MapPost("CourseBranches/Delete", ([FromBody] CourseBranchesVM courseBranches, IMapper mapper, ICourseBranches IcourseBranches) =>
            {
                try
                {
                    var result = mapper.Map<CourseBranches>(courseBranches);
                    IcourseBranches.Delete(result);

                    return new Response<string> { code = 200, message = "data Deleted Successfully", data = null };

                }
                catch (Exception e)
                {
                    return new Response<string> { code = 400, message = e.InnerException.Message, data = null };

                }

            });

            /*end course Branch*/

            /*start order*/

            app.MapGet("/MakeOrder/{CourseId}", async (int CourseId, IOrder Order) =>
            {
                var ClientSecret = await Order.CreateOrder(CourseId);
                if (!string.IsNullOrEmpty(ClientSecret))
                {
                    return new Response<string> { code = 200, data = ClientSecret };
                }
                else
                {
                    return new Response<string> { code = 400, data = null };

                }

            });
            app.MapPost("/ConfirmOrder", async (UserManager<IdentityUser> usermanager, IPayment _payment,IStudentCourse studentCourse, IConfiguration config, IStudent _student, [FromBody] ConfirmOrder confirmOrder, DataContext db) =>
            {
                try
                {


                    StripeConfiguration.ApiKey = config["StripeSetting:SecretKey"];
                    var paymentservice = new PaymentIntentService();
                    var data = paymentservice.Get(confirmOrder.paymentID);
                    var ChargeService = new ChargeService();
                    var charge = ChargeService.Get(data.LatestChargeId);
                    var user = await usermanager.FindByIdAsync(confirmOrder.userID);

                    var studentexist = _student.GetByID(user.Id);
                    Student student = new Student();
                    if (studentexist is null)
                    {
                        student = new Student
                        {
                            Email = user.Email,
                            phone = user.PhoneNumber,
                            Name = user.UserName,
                            Id = user.Id
                        };

                    }
                    else
                    {
                        student = _student.GetByID(user.Id);
                    }


                    var payment = new Payment
                    {
                        Id = confirmOrder.paymentID,
                        name = confirmOrder.name,
                        Date = DateTime.Now.Date,
                        CardNumber = charge.PaymentMethodDetails.Card.Last4,
                        ExpirationMonth = charge.PaymentMethodDetails.Card.ExpMonth.ToString(),
                        ExpirationYear = charge.PaymentMethodDetails.Card.ExpYear.ToString(),

                    };


                    var sc = new StudentCourse
                    {
                        studentid = user.Id,
                        courseid = confirmOrder.courseID,
                        AssigmentDate = DateTime.Now.Date,
                        paymentid = confirmOrder.paymentID
                    };


                    var studentCourseExist = studentCourse.GetById(sc.studentid, sc.courseid);
                    if (studentCourseExist is not null)
                    {
                        throw new Exception("You Have Alreday Assigned To That Course");
                    }

                    using (var transaction = db.Database.BeginTransaction())
                    {
                        try
                        {

                            _student.Add(student);
                            _payment.Add(payment);
                            studentCourse.Add(sc);
                           

                            transaction.Commit();
                            return new Response<string> { code = 200, message = "Successful Opertaion" };

                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            return new Response<string> { code = 400, message = ex.Source };

                        }
                    }

                }
                catch (Exception ex)
                {
                    return new Response<string> { code = 400, message = ex.StackTrace };
                }

            });
            /*end order*/

            /*start Payment*/

            app.MapGet("/Payment/GetAll", (IPayment payment, IMapper mapper) =>
            {
                var data = payment.GetAll();
                var result = mapper.Map<IEnumerable<PaymentVM>>(data);
                return new Response<IEnumerable<PaymentVM>> { code = 200, data = result };
            });


            app.MapGet("/Payment/GetById/{id}", (string id, IPayment payment, IMapper mapper) =>
            {
                var data = payment.GetByID(id);
                var result = mapper.Map<PaymentVM>(data);
                return new Response<PaymentVM> { code = 200, data = result };
            });

            /*end payment*/

            /*start StudentCourse*/

            app.MapGet("/StudentCourse", (IStudentCourse sc, IMapper mapper) =>
            {
                var data = sc.GetAll();
                var result = mapper.Map<IEnumerable<StudentCourseVM>>(data);
                return new Response<IEnumerable<StudentCourseVM>> { code = 200, data = result };

            });
            app.MapGet("/GetStudentCourses/{studentID}", (string studentID, IStudentCourse sc, IMapper mapper) =>
            {
                var data = sc.GetStudentEnrolledCourses(studentID);
                var result = mapper.Map<IEnumerable<StudentCourseVM>>(data);
                return new Response<IEnumerable<StudentCourseVM>> { code = 200, data = result };

            });


            app.MapGet("/GetCourseCountOfStudent/{courseID}", (int courseID, IStudentCourse sc, IMapper mapper) =>
            {
                var data = sc.GetCourseEnrolledStudentsCount(courseID);
              
                return new Response<int> { code = 200, data = data };

            });


            /*end StudentCourse*/


            /*start Student*/
            
            app.MapGet("/Student/GetAll", (IStudent student, IMapper mapper) =>
            {
                var data = student.GetAll();
                var result = mapper.Map<IEnumerable<StudentVM>>(data);

                return new Response<IEnumerable<StudentVM>> { code = 200, data = result };

            });
           
            app.MapGet("/Student/GetById/{id}", (string id, IStudent student, IMapper mapper) =>
            {
                var data = student.GetByID(id);
                var result = mapper.Map<StudentVM>(data);
                
                return new Response<StudentVM> { code = 200, data =result };

            });

            /*end student*/

            app.MapPost("/SendEmail", (SendEmailVM SendEmail) =>
            {
                var data=MailSender.sendmail(SendEmail.Email, SendEmail.Message);
                return new Response<bool> { code = 200, message = "Email Sent Successfully", data = data.Result };
            });
            app.Run();



        }
    }
}