using Courses_App.DAL.Models;

namespace Courses_App.BL.Interfaces
{
    public interface ICourseBranches
    {
        void Add(CourseBranches courseBranches);
        void Remove(CourseBranches courseBranches);
        void Update(CourseBranches courseBranches);
        int getcount(int crsid, int branchid);
       IEnumerable<CourseBranches> GetById(int courseid);

       void Delete(CourseBranches courseBranches);
    }
}
