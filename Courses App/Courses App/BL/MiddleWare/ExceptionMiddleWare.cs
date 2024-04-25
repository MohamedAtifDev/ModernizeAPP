using Courses_App.BL.VM;
using Newtonsoft.Json;
using System.Net;
using System.Text.Json;
using System.Web.Helpers;

namespace Courses_App.BL.MiddleWare
{
    public class ExceptionMiddleWare
    {
        private readonly RequestDelegate next;

        public ExceptionMiddleWare(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }catch (Exception ex) {

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace.ToString());
                var options = new JsonSerializerOptions
                {

                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var json = System.Text.Json.JsonSerializer.Serialize(response,options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
