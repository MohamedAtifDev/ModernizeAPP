namespace Courses_App.BL
{
    public class ApiException : Error
    {
        public ApiException(int statuscode, string message, string details) : base(statuscode, message)
        {

            Details = details;
        }

        public string Details { get; set; }




    }
}
