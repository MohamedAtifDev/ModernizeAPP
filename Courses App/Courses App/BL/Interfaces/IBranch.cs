using Courses_App.DAL.Models;

namespace Courses_App.BL.Interfaces
{
    public interface IBranch
    {
        void Add(Branch branch);
        void Update(Branch branch);
        void Delete(int id);
        IEnumerable<Branch> GetAll();
        Branch GetByID(int id);

      
        
    }
}
