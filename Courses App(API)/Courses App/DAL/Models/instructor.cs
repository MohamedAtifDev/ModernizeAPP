using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class instructor
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        [Column(TypeName = "Date")]
        public DateTime Birthdate { get; set; } 
        public string cvname { get; set; }
        public string imgname { get;set; }

        public  Course course { get; set; }
    }
}
