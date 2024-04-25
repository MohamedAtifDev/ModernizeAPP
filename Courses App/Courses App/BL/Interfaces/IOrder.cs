namespace Courses_App.BL.Interfaces
{
    public interface IOrder
    {
         Task<string> CreateOrder(int CourseID);
    }
}
