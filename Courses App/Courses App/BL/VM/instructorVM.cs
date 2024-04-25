using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Courses_App.BL.VM
{
    public class instructorVM
    {
        public int Id { get; set; }
      
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
       
        public DateTime Birthdate { get; set; }
        public string cvname { get; set; }

        public IFormFile cv { get;set; }
        public IFormFile img {  get; set; }
        public string imgname { get; set; }
        public Course course { get; set; }

        public static ValueTask<instructorVM?> BindAsync(HttpContext context,
                                                   ParameterInfo parameter)
        {
            var id = context.Request.Form["id"];
            if (id.Count == 0)
            {
                id = "0";
            }
            var img = context.Request.Form.Files["img"];
            var cv = context.Request.Form.Files["cv"];
            var name = context.Request.Form["name"];
            var email = context.Request.Form["email"];
            var phone = context.Request.Form["phone"];
            var birthdate = context.Request.Form["birthdate"];
            var course = context.Request.Form["course"];
             
            return ValueTask.FromResult<instructorVM>(new instructorVM
            {
                Id = int.Parse(id),
                img = img,
                Name = name,
                Phone = phone,
                Email = email,
                Birthdate = DateTime.Parse(birthdate),
                cv=cv,
             
            }); ; ; ;
            ;
        }

    }
}
