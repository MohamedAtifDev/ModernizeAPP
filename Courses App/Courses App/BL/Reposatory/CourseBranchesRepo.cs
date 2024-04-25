using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_App.BL.Reposatory
{
    public class CourseBranchesRepo : ICourseBranches
    {
        private readonly DataContext db;

        public CourseBranchesRepo(DataContext db)
        {
            this.db = db;
        }
        public void Add(CourseBranches courseBranches)
        {
            this.db.courseBranches.Add(courseBranches);
            db.SaveChanges();
        }

        public void Remove(CourseBranches courseBranches)
        {
            this.db.courseBranches.Remove(courseBranches);
            db.SaveChanges();
        }

        public void Update(CourseBranches courseBranches)
        {
            db.Entry(courseBranches).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
        }

      public int getcount(int crsid,int branchid)
        {
           return this.db.courseBranches.Where(a => a.branchid == branchid && a.courseid == crsid).Count();
        }
        public IEnumerable<CourseBranches> GetById(int courseid)
        {
            return db.courseBranches.Where(a => a.courseid == courseid).Include(a => a.branch);
        }


        public void Delete(CourseBranches courseBranches)
        {
            var data=this.db.courseBranches.Where(a => a.courseid
            == courseBranches.courseid && a.branchid == courseBranches.branchid);
            this.db.courseBranches.RemoveRange(data);
            db.SaveChanges();
        }
    }
}
