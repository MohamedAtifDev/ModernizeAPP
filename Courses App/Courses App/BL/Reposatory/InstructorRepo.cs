using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_App.BL.Reposatory
{
    public class InstructorRepo : IInstructor
    {
        private readonly DataContext db;

        public InstructorRepo(DataContext db)
        {
            this.db = db;
        }
        public void Add(instructor instructor)
        {this.db.instructors.Add(instructor);
            db.SaveChanges();

        }

        public void Delete(int id)
        {
            this.db.Remove(this.db.instructors.Find(id));
            db.SaveChanges();
        }

        public IEnumerable<instructor> GetAll()
        {
            return db.instructors.Select(a => a).Include(a=>a.course).AsNoTracking();
        }

        public instructor GetById(int id)
        {
            var data= db.instructors.Select(a => a).Include(a => a.course);
            return data.Where(a => a.Id == id).SingleOrDefault();
        }

        public void Update(instructor instructor)
        {
            db.Entry(instructor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
        }
    }
}
