using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using static System.Net.WebRequestMethods;

namespace Courses_App.BL.Services
{
    public class MailSender
    {
        public static async Task<bool> sendmail(string recieveremail, string body)
        {
            try
            {
                var email = new MimeMessage()
                {
                    Sender = MailboxAddress.Parse("atiffahmykhamis@gmail.com"),
                    Subject = "Message from Courses Website "
                

                };
                email.To.Add(MailboxAddress.Parse(recieveremail));
                var builder = new BodyBuilder();


                builder.HtmlBody = body;
                email.Body = builder.ToMessageBody();


                email.From.Add(new MailboxAddress("Courses Website ", "atiffahmykhamis@gmail.com"));



                using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                {
                    smtp.Connect("smtp.gmail.com", 587, false);
                    smtp.Authenticate("atiffahmykhamis@gmail.com", "fmnjnhsdhmrugigq");
                    await smtp.SendAsync(email);
                    smtp.Disconnect(true);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
    }
}
