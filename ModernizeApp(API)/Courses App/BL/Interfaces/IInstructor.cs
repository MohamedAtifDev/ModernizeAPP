using Courses_App.DAL.Models;

namespace Courses_App.BL.Interfaces
{
    public interface IInstructor
    {
        void Add(instructor instructor);
        void Update(instructor instructor);
        void Delete(int id);
        IEnumerable<instructor> GetAll();
        instructor GetById(int id);
    }
}
