using Courses_App.DAL.Models;

namespace Courses_App.BL.Interfaces
{
    public interface IStudentCourse
    {
        void Add(StudentCourse studentCourse);
        void Update(StudentCourse studentCourse);
        StudentCourse GetById(string studentid, int courseid);
        IEnumerable<StudentCourse> GetAll();
        void Delete(StudentCourse studentCourse);
        public IEnumerable<StudentCourse> GetStudentEnrolledCourses(string studentid);

        public int GetCourseEnrolledStudentsCount(int  courseid);
    }
}
