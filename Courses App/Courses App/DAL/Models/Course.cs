using Microsoft.Extensions.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class Course
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Description { get; set; }
        public int price { get; set; }
        [Column(TypeName ="Date")]
        public DateTime startDate { get; set; }
        [Column(TypeName = "Date")]
        public DateTime endDate { get; set; }
        public string imgname { get; set; }
       public int? instructorid { get; set; }
        [ForeignKey("instructorid")]
     
        public  instructor instructor { get; set; }
        [JsonIgnore]
        public   IEnumerable<CourseBranches> CourseBranches { get; set; }
        [JsonIgnore]
        public  IEnumerable<StudentCourse> studentCourses { get; set; }



    }
}
