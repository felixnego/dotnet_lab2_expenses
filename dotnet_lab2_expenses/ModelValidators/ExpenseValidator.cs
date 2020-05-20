using System;
using FluentValidation;
using dotnet_lab2_expenses.Models;


namespace dotnet_lab2_expenses.ModelValidators
{
    public class ExpenseValidator : AbstractValidator<ExpenseItem>
    {
        public ExpenseValidator()
        {
            RuleFor(x => x.Description)
                .MinimumLength(4)
                .WithMessage("Description cannot be that short. Must have at least 4 characters");

            RuleFor(x => x.Location)
                .MinimumLength(5)
                .WithMessage("Location field is too short. Must have at least 5 characters");

            RuleFor(x => x.Sum)
                .GreaterThan(1)
                .WithMessage("Expenses for less than 1 of selected currency cannot be entered");
        }
    }
}
