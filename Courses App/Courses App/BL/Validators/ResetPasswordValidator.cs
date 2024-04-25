using Courses_App.BL.VM;
using FluentValidation;

namespace Courses_App.BL.Validators
{
    public class ResetPasswordValidator:AbstractValidator<ResetpasswordVM>
    {
        public ResetPasswordValidator()
        {
            RuleFor(x => x.email).NotNull().WithMessage("Email is required").EmailAddress().WithMessage("Enter valid Email");
            RuleFor(x => x.password).NotNull().WithMessage("Password is required").Matches("[A-Z]").WithMessage("Password must contain one or more capital letters.")
    .Matches("[a-z]").WithMessage("Password must contain one or more lowercase letters.")
    .Matches(@"\d").WithMessage("Password must contain one or more digits.")
    .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("Password must contain one or more special characters.")
    .Matches("^[^£# “”]*$").WithMessage("Password must not contain the following characters £ # “” or spaces.");
            RuleFor(x => x.confirmpassword).NotNull().WithMessage("Confirm password is required").Matches(a => a.password).When(a => a.password != null).WithMessage("confirm password must match Password");
        }
    }
}
