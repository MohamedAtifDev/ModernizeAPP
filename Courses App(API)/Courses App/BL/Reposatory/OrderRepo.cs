using Courses_App.BL.Interfaces;
using Courses_App.DAL.Models;
using Stripe;
using System.Drawing.Text;

namespace Courses_App.BL.Reposatory
{
    public class OrderRepo : IOrder
    {
        private readonly ICourse crs;
        private readonly IConfiguration config;

        public OrderRepo(ICourse crs,IConfiguration config)
        {
            this.crs = crs;
            this.config = config;
        }
        public async Task<string> CreateOrder(int CourseID)
        {
            try
            {


                var course = crs.getbyid(CourseID);
                StripeConfiguration.ApiKey = config["StripeSetting:SecretKey"];
                var service = new PaymentIntentService();
                PaymentIntent payment;
                var options = new PaymentIntentCreateOptions
                {
                    Amount = course.price * 100,
                    PaymentMethodTypes = new List<string> { "card" },
                    Currency = "usd",
                
                   
                };
                payment = await service.CreateAsync(options);
                return payment.ClientSecret;
            }catch(Exception ex)
            {
                return null;

            }
        }
    }
}
