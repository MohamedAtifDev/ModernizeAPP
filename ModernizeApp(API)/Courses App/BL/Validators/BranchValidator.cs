using Courses_App.BL.VM;
using FluentValidation;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Courses_App.BL.Validators
{
    public class BranchValidator:AbstractValidator<BranchVM>
    {
        public BranchValidator()
        {
            RuleFor(x => x.name).NotEmpty().WithMessage("Name is Reuired").MinimumLength(3).WithMessage("Min length is 3").MaximumLength(20).WithMessage("max length is 20");
            RuleFor(x=>x.location).NotEmpty().WithMessage("Location is Reuired").MinimumLength(3).WithMessage("Min length is 3").MaximumLength(20).WithMessage("max length is 20");
        }
    }
}
