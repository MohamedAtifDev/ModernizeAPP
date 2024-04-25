using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class Payment
    {
        public string Id { get; set; }


        public string name { get; set; }

        public string ExpirationYear { get; set; }

        public string ExpirationMonth { get; set; }

        public string CardNumber { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
     
        public  StudentCourse StudentCourse { get; set; }
    }
}
