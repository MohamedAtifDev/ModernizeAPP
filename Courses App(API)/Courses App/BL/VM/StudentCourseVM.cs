using Courses_App.DAL.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_App.BL.VM
{
    public class StudentCourseVM
    {

        public string studentid { get; set; }
        public int courseid { get; set; }
     
        public DateTime AssigmentDate { get; set; }


        public Student student { get; set; }
      

        public Course course { get; set; }

        public string paymentid { get; set; }

        public Payment payment { get; set; }
    }
}
