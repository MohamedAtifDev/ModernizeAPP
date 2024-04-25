using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class Student
    {
        public string Id { get; set; }
        
       
        public string Name { get; set; }
        public string phone { get; set; }
        public string Email { get; set; }
        
        public  IEnumerable<StudentCourse> studentCourses { get; set; }

    }
}
