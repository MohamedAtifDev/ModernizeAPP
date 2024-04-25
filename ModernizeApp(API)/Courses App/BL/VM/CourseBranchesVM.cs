using Courses_App.DAL.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_App.BL.VM
{
    public class CourseBranchesVM
    {
        public int courseid { get; set; }
        public int branchid { get; set; }
      
        public Branch branch { get; set; }

      
        public Course course { get; set; }
    }
}
