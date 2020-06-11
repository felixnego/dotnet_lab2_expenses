using System;
using System.ComponentModel.DataAnnotations;

namespace dotnet_lab2_expenses.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
