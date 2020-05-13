using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace dotnet_lab2_expenses.Models
{
    public class TypePropertyValidator : ValidationAttribute
    {
        private enum AcceptedTypes {
            food,
            utilities,
            transportation,
            outing,
            groceries,
            clothes,
            electronics,
            other
        }

        public TypePropertyValidator()
        {
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null) return ValidationResult.Success;

            var textValue = value.ToString();

            return Enum.GetNames(typeof(AcceptedTypes)).Contains(textValue)
                ? ValidationResult.Success
                : new ValidationResult("Type of expense has to be in the accepted categories!");
        }
    }
}
