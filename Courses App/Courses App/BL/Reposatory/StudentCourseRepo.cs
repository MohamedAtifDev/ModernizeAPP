using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Text;

namespace Courses_App.BL.Reposatory
{
    public class StudentCourseRepo:IStudentCourse
    {
        private readonly DataContext db;

        public StudentCourseRepo( DataContext db)
        {
            this.db = db;
        }

        public void Add(StudentCourse studentCourse)
        {
    db.studentCourses.Add(studentCourse);
            db.SaveChanges();
        }

        public void Delete(StudentCourse studentCourse)
        {
           var data= db.studentCourses.Where(a => a.courseid == studentCourse.courseid && a.studentid == studentCourse.studentid);
            db.studentCourses.Remove(data.FirstOrDefault());
            db.SaveChanges();
        }

        public IEnumerable<StudentCourse> GetAll()
        {
            return db.studentCourses.Select(a => a);
        }

        public StudentCourse GetById(string studentid, int courseid)
        {
            var data = db.studentCourses.Where(a => a.courseid == courseid && a.studentid == studentid).ToArray();
            return data.Length==0 ?null : data[0];
        }

        public IEnumerable<StudentCourse> GetStudentEnrolledCourses(string studentid)
        {
            var data = db.studentCourses.Where(a=>a.studentid == studentid).Include(a=>a.course).ToArray();
            return data;
        }

        public void Update(StudentCourse studentCourse)
        {
        db.Entry(studentCourse).State=Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
        }


        public int GetCourseEnrolledStudentsCount(int courseid)
        {
            return db.studentCourses.Where(A => A.courseid == courseid).Count();

        }
    }
}
