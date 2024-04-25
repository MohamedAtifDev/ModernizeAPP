using Courses_App.BL.VM;
using FluentValidation;

namespace Courses_App.BL.Validators
{
    public class ForgetPasswordValidator:AbstractValidator<ForgetPasswordVM>
    {
        public ForgetPasswordValidator()
        {
            RuleFor(x => x.Email).EmailAddress().WithMessage("Enter valid Email").NotNull().WithMessage("Email is required");
        }
    }
}
