using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dotnet_lab2_expenses.Models
{
    public class ExpenseItem
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Sum { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }

        [Required]
        public string Currency { get; set; }

        [Required]
        [TypePropertyValidator]
        public string Type { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
