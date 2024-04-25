using System.ComponentModel.DataAnnotations;

namespace Courses_App.BL.VM
{
    public class ResetpasswordVM
    {
        public string? password { get; set; }
      
        public string? confirmpassword { get; set; }
        public string? email { get; set; }
        public string? token { get; set; }
    }
}
