using Courses_App.BL.VM;
using FluentValidation;

namespace Courses_App.BL.Validators
{
    public class CourseValidator:AbstractValidator<CourseVM>
    {
        public CourseValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required").MinimumLength(5).WithMessage("Name min length is 5").MaximumLength(20).WithMessage("Name max length is 10");
            RuleFor(x => x.price).NotEmpty().WithMessage("price is required").InclusiveBetween(10, 10000).WithMessage("Price must be between 10 and 10000");
            RuleFor(x => x.startDate).NotEmpty().WithMessage("start Date is Required");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required").MinimumLength(5).WithMessage("Description min length is 5").MaximumLength(20).WithMessage("Description max length is 20");
            RuleFor(x => x.endDate).NotEmpty().WithMessage("end Date is Required");
            RuleFor(x => x.Img).NotEmpty().WithMessage("Image is Required");
            RuleFor(x => x.instructorid).NotEmpty().WithMessage("Instructor is required");

        }
    }
}
