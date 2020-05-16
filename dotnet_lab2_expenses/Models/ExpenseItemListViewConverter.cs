using System.Linq;
using System;
using System.Collections.Generic;

namespace dotnet_lab2_expenses.Models   
{
    public class ExpenseItemListViewConverter
    {
        
        public static IEnumerable<ExpenseItemListView> ConvertToListView(IEnumerable<ExpenseItem> items)
        {
            return items.Select(item => new ExpenseItemListView
            {
                Description = item.Description,
                Sum = item.Sum,
                Type = item.Type,
                Date = item.Date,
                Comments = CommentDtoConverter.ConvertCommentsToDto(item.Comments).ToList()
            }); ; 
        }
    }
}
