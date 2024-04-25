using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_App.BL.Interfaces
{
    public interface IPayment
    {

      
        Payment GetByID(string id);
        IEnumerable<Payment> GetAll();

        void Add(Payment payment);  

        void Update(Payment payment);   

        void Delete(string id);

    }
}
