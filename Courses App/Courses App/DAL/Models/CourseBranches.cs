
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class CourseBranches
    {
        public int courseid { get; set; }
        public int branchid { get; set; }
        [ForeignKey("branchid")]
    
        public  Branch branch { get; set; }
       
        [ForeignKey("courseid")]
      
        public  Course course { get; set; }
    }
}
