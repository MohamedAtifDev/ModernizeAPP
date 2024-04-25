using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class StudentCourse
    {
      
        public string studentid { get; set; }
        public int courseid { get; set; }
        [Column(TypeName = "Date")]
        public DateTime AssigmentDate { get; set; }
        [ForeignKey("studentid")]
        
        public  Student student { get; set; }
        [ForeignKey("courseid")]
        
        public  Course course { get; set; }

        public string paymentid { get; set; }

        [ForeignKey("paymentid")]
        [JsonIgnore]
        public   Payment payment { get; set; }

    }
}
