using Courses_App.BL.VM;
using FluentValidation;

namespace Courses_App.BL.Validators
{
    public class CourseBranchesValidator:AbstractValidator<CourseBranchesVM>
    {
        public CourseBranchesValidator()
        {
            
            RuleFor(x => x.courseid).NotEmpty().WithMessage("course is required");
            RuleFor(x => x.branchid).NotEmpty().WithMessage("branch is required");
        }
    }
}
