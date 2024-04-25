using Courses_App.BL.Interfaces;
using Courses_App.DAL.Database;
using Courses_App.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Courses_App.BL.Reposatory
{
    public class PaymentRepo : IPayment
    {
        private readonly DataContext db;

        public PaymentRepo(DataContext db)
        {
            this.db = db;
        }

        public void Add(Payment payment)
        {
            db.payments.Add(payment);
            db.SaveChanges();
        }

        public void Delete(string id)
        {
            db.payments.Remove(db.payments.Find(id));
            db.SaveChanges();
        }

        public IEnumerable<Payment> GetAll()
        {
            return this.db.payments.
                Select(a => a).Include(a=>a.StudentCourse)
                .ThenInclude(a=>a.student)
                .Include(a=>a.StudentCourse)
                .ThenInclude(a=>a.course);
        }

        public Payment GetByID(string id)
        {

            var data = this.db.payments.
                Where(a => a.Id == id).IgnoreAutoIncludes().Include(a => a.StudentCourse).IgnoreAutoIncludes();

            var result=data
                .Include(a => a.StudentCourse.student).IgnoreAutoIncludes()
                .Include(a => a.StudentCourse.course).IgnoreAutoIncludes()
                .ToArray();


            return result[0];

        }

        public void Update(Payment payment)
        {
   db.Entry(payment).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
