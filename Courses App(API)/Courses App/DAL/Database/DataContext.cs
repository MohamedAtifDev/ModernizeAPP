using Courses_App.DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection.Emit;

namespace Courses_App.DAL.Database
{
    public class DataContext:IdentityDbContext
    {
        
        public DataContext(DbContextOptions<DataContext> opts) : base(opts)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<CourseBranches>().HasKey(a => new { a.branchid, a.courseid });
            builder.Entity<StudentCourse>().HasKey(a => new { a.studentid, a.courseid });
            builder.Entity<Course>().HasOne<instructor>(a=>a.instructor).WithOne(a=>a.course).OnDelete(DeleteBehavior.SetNull);

        }
        public DbSet<Branch> branches { get; set; }
        public DbSet<Course> courses { get; set; }
        public DbSet<instructor> instructors { get; set; }

        public DbSet<Student> students { get; set; }

        public DbSet<CourseBranches> courseBranches { get; set; }

        public DbSet<StudentCourse> studentCourses { get; set; }

        public DbSet<Payment> payments { get; set; }

    }
}
