using Courses_App.DAL.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace Courses_App.BL.VM
{
    public class CourseVM
    {
        public int Id { get; set; }
    
        public string Name { get; set; }
      
        public string Description { get; set; }
        public int price { get; set; }
       
        public DateTime startDate { get; set; }
     
        public DateTime endDate { get; set; }
        public string? imgname { get; set; }
        public int instructorid { get; set; }
       
        public instructor? instructor { get; set; }
       
        public IEnumerable<CourseBranchesVM>? CourseBranches { get; set; }
        public IFormFile Img {  get; set; }
        public static ValueTask<CourseVM?> BindAsync(HttpContext context,
                                                     ParameterInfo parameter)
        {
           
            var file = context.Request.Form.Files["img"];
            var name = context.Request.Form["name"];
            var description = context.Request.Form["description"];
            var price = context.Request.Form["price"];
            var startDate = context.Request.Form["startDate"];
            var endDate = context.Request.Form["endDate"];
            var instructorid = context.Request.Form["instructorid"];

            return ValueTask.FromResult<CourseVM>(new CourseVM
            {
               
                Img = file,
                Name = name,
                Description = description,
                price = int.Parse(price),
                startDate = DateTime.Parse(startDate),
                endDate = DateTime.Parse(endDate),
                instructorid = int.Parse(instructorid)

            }); ; ; ;
            ;
        }
    }
}
