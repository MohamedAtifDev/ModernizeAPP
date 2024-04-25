namespace Courses_App.BL
{
    public class Response<T>
    {
        public int code { get; set; }
        public string[] messages { get; set; }
        public string message { get; set; }
        public T ?data { get; set; }
    }
}
