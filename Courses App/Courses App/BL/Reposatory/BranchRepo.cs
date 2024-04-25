using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_App.BL.Reposatory
{
    public class BranchRepo : IBranch
    {
        private readonly DataContext db;

        public BranchRepo(DataContext db)
        {
            this.db = db;
        }
        public void Add(Branch branch)
        {
            this.db.branches.Add(branch);
            db.SaveChanges();
        }

        public void Delete(int id)
        {this.db.branches.Remove(db.branches.Find(id));
            db.SaveChanges();
        }

        public IEnumerable<Branch> GetAll()
        {
            return db.branches.Select(a => a).Include(a => a.CourseBranches).AsNoTracking();
        }

        public Branch GetByID(int id)
        {
            var data = db.branches.Where(a => a.id==id).Include(a => a.CourseBranches);
            return data.FirstOrDefault();
        }

        public void Update(Branch branch)
        {
           this.db.Entry(branch).State=Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
        }
       
    }
}
