using System.Text.Json.Serialization;

namespace Courses_App.DAL.Models
{
    public class Branch
    {
        public int id { get; set; }
        public string name { get; set; }    
        public string location { get; set; }
        
        public  IEnumerable<CourseBranches> CourseBranches { get; set; }
    }
}
