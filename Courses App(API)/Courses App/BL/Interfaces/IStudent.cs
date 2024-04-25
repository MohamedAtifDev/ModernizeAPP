using Courses_App.DAL.Models;

namespace Courses_App.BL.Interfaces
{
    public interface IStudent
    {
        IEnumerable<Student> GetAll();
        Student GetByID(string id);

        void Add(Student Student);

        void Update(Student Student);

        void Delete(string id);
    }
}
