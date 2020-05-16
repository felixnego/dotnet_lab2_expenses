using System;
namespace dotnet_lab2_expenses.Models
{
    public class Comment
    {
        public long Id { get; set; }

        public string Text { get; set; }

        public bool Important { get; set; }

        public ExpenseItem ExpenseItem { get; set; }
    }
}
