using System;
using System.ComponentModel.DataAnnotations;

namespace dotnet_lab2_expenses.Models
{
    public class ExpenseItem
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal sum { get; set; }

        [Required]
        public string location { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime date { get; set; }

        [Required]
        public string currency { get; set; }

        [Required]
        [TypePropertyValidator]
        public string type { get; set; }
    }
}
