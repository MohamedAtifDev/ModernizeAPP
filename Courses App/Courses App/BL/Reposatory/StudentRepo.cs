using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_App.BL.Reposatory
{
    public class StudentRepo : IStudent
    {
        private readonly DataContext db;

        public StudentRepo(DataContext db)
        {
            this.db = db;
        }

        public void Add(Student Student)
        {
            db.students.Add(Student);
            db.SaveChanges();
        }

        public void Delete(string id)
        {
            db.students.Remove(db.students.Find(id));
            db.SaveChanges();
        }

        public IEnumerable<Student> GetAll()
        {
            return this.db.students.Include(a => a.studentCourses).ThenInclude(a => a.course);
        }

        public Student GetByID(string id)
        {
            var data= this.db.students.Where(a=>a.Id==id).Include(a => a.studentCourses).ThenInclude(a => a.course).ToArray();
            return data.Length==0 ? null : data[0];
        }

        public void Update(Student Student)
        {
            db.Entry(Student).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
