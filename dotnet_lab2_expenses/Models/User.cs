using System;
using System.Text.Json.Serialization;

namespace dotnet_lab2_expenses.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
