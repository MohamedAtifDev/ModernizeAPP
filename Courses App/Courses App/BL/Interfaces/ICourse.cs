using Courses_App.DAL.Models;

namespace Courses_App.BL.Interfaces
{
    public interface ICourse
    {
        void Add(Course course);
        void update(Course course); 
        void delete(int id);
        IEnumerable<Course> getAll();
        Course getbyid(int id);
    }
}
