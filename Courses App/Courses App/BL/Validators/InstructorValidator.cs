using Courses_App.BL.VM;
using FluentValidation;

namespace Courses_App.BL.Validators
{
    public class InstructorValidator:AbstractValidator<instructorVM>
    {
        public InstructorValidator()
        {
                RuleFor(x=>x.Name).NotEmpty().WithMessage("Name is Required").MinimumLength(5).WithMessage("min length is 5 chars").MaximumLength(20).WithMessage("Max length is 20 chars");
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email is Required").EmailAddress().WithMessage("Please Enter valid email");
            RuleFor(x => x.Birthdate).NotEmpty().WithMessage("birthdate is required");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Phone is Required");
            RuleFor(x=>x.cv).NotEmpty().WithMessage("cv is Required");
            RuleFor(x => x.img).NotEmpty().WithMessage("image is Required");
        }
    }
}
