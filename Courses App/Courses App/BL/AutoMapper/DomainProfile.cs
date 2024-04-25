using AutoMapper;
using Courses_App.BL.VM;
using Courses_App.DAL.Models;

namespace OnlineExamAPI.BL.Auto_mapper
{
    public class DomainProfile:Profile
    {
        public DomainProfile()
        {
            CreateMap<Course, CourseVM>();
            CreateMap<CourseVM, Course>();
            CreateMap<instructor, instructorVM>();
            CreateMap<instructorVM, instructor>();
            CreateMap<BranchVM, Branch>();
            CreateMap<Branch, BranchVM>();
            CreateMap<CourseBranchesVM, CourseBranches>();
            CreateMap<CourseBranches, CourseBranchesVM>();
            CreateMap<Payment, PaymentVM>();
            CreateMap<PaymentVM, Payment>();
            CreateMap<StudentCourseVM,StudentCourse>().ReverseMap();
            CreateMap<Student, StudentVM>().ReverseMap();
            CreateMap<Payment, PaymentVM>().ReverseMap();
        }
    }
}
