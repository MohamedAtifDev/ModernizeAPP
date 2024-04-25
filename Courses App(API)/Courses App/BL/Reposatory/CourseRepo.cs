using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_App.BL.Reposatory
{
    public class CourseRepo:ICourse
    {
        private readonly DataContext db;

        public CourseRepo(DataContext db)
        {
            this.db = db;
        }
        public void Add(DAL.Models.Course course)
        {
            this.db.courses.Add(course);
            db.SaveChanges();

        }

        public void delete(int id)
        {
            this.db.courses.Remove(db.courses.Find(id));
            db.SaveChanges();
        }

        public IEnumerable<Course> getAll()
        {
            var data= db.courses.Select(a => a).AsSplitQuery().Include(a=>a.instructor).Include(a=>a.CourseBranches).ThenInclude(a=>a.branch).AsNoTracking();

            return data;
        }

        public Course getbyid(int id)
        {
            var data = db.courses.Select(a => a).AsSplitQuery().Include(a => a.instructor);

            return data.Where(a=>a.Id==id).SingleOrDefault();
        }

        public void update(Course course)
        {
            db.Entry(course).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
        }
    }
}
