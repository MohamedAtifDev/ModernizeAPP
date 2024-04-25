using Courses_App.BL.VM;
using FluentValidation;

namespace Courses_App.BL.Validators
{
    public class LoginValidator:AbstractValidator<LoginVM>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotNull().WithMessage("Email is required").EmailAddress().WithMessage("please Enter valid Email");

            RuleFor(x => x.password).NotEmpty().WithMessage("Please Enter Password");
          
   

        }
    }
}
