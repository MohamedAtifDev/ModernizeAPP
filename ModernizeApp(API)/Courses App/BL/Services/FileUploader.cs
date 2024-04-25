using System.Web.Mvc.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting.Internal;
using System;
using System.IO;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace WebApplication12.BL.helper
{//tjis class to upload images of products
    public static  class FileUploader
    {
      


        public static string upload(string foldername, IFormFile myfile)
        {
            
            try
            {
                string path = Directory.GetCurrentDirectory()  + foldername;
                string filename = Guid.NewGuid() + Path.GetFileName(myfile.FileName);
                string finalpath = Path.Combine(path, filename);
                using (var stream = new FileStream(finalpath, FileMode.Create))
                {
                    myfile.CopyTo(stream);
                }


                return filename;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public static void delete(string foldername, string filename)
        {
            try
            {
                var path = Directory.GetCurrentDirectory() + "/wwwroot/assets/files/" + foldername + filename;
                if (File.Exists(path))
                {
                    File.Delete(path);
                }

            }
            catch (Exception e)
            {

            }
        }
    }
}
