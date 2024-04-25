using Courses_App.DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace Courses_App.BL.VM
{
    public class PaymentVM
    {
        public string Id { get; set; }


        public string name { get; set; }

        public string ExpirationYear { get; set; }

        public string ExpirationMonth { get; set; }

        public string CardNumber { get; set; }

        public DateTime Date { get; set; }

        public StudentCourse StudentCourse { get; set; }
    }
}
