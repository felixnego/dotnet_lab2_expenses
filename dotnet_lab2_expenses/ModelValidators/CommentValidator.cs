﻿using System;
using FluentValidation;
using dotnet_lab2_expenses.Models;

namespace dotnet_lab2_expenses.ModelValidators
{
    public class CommentValidator : AbstractValidator<Comment>
    {
        public CommentValidator()
        {
            RuleFor(x => x.Text).MinimumLength(3);
        }
    }
}
