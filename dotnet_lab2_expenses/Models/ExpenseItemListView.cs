using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dotnet_lab2_expenses.Models
{
    public class ExpenseItemListView
    {
        public long Id { get; set; }

        public decimal Sum { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public string Type { get; set; }

        public List<CommentDto> Comments { get; set; }

        public int NoComments { get; set; }
    }
}
