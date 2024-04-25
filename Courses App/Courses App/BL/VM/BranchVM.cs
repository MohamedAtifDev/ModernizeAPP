using Courses_App.DAL.Models;
using System.Reflection;

namespace Courses_App.BL.VM
{
    public class BranchVM
    {
        public int id { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public IEnumerable<CourseBranchesVM> CourseBranches { get; set; }

        //public static ValueTask<BranchVM?> BindAsync(HttpContext context,
        //                                            ParameterInfo parameter)
        //{
        //    var id = context.Request.Form["id"];
        //    if (id.Count == 0)
        //    {
        //        id = "0";
        //    }
        //    var location = context.Request.Form["location"];
        //    var name = context.Request.Form["name"];
           

        //    return ValueTask.FromResult(new BranchVM
        //    {
        //        id = int.Parse(id),
            
        //        name = name,
        //       location=location

        //    });
        //    ;
        //}
    }
}
