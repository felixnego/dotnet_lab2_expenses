using System;
using Microsoft.EntityFrameworkCore;
using dotnet_lab2_expenses.Models;

namespace dotnet_lab2_expenses.Models
{
    public class ExpenseContext : DbContext
    {
        public ExpenseContext(DbContextOptions<ExpenseContext> options)
            :base(options)
        {
        }
        public DbSet<dotnet_lab2_expenses.Models.ExpenseItem> ExpenseItem { get; set; }
    }
}
