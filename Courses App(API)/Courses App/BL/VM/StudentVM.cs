using Courses_App.DAL.Models;

namespace Courses_App.BL.VM
{
    public class StudentVM
    {
        public string Id { get; set; }


        public string Name { get; set; }
        public string phone { get; set; }
        public string Email { get; set; }

        public IEnumerable<StudentCourse> studentCourses { get; set; }

        public static explicit operator StudentVM(string v)
        {
            throw new NotImplementedException();
        }
    }
}
