namespace Courses_App.BL
{
    public class Error
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public Error(int statuscode, string message = null)
        {
            StatusCode = statuscode;
            Message = message ?? ReplaceStatusWithMessage(StatusCode);
        }

        private string ReplaceStatusWithMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request",
                401 => "Not Authorized",
                404 => "Not Found ",
                500 => "Server Error"

            };
        }
    }
}
