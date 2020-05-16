using System;
using System.ComponentModel.DataAnnotations;

namespace dotnet_lab2_expenses.Models
{
    public class ExpenseItemListView
    {

        public decimal Sum { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public string Type { get; set; }
    }
}
