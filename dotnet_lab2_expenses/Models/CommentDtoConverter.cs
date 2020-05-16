using System;
using System.Collections.Generic;
using System.Linq;

namespace dotnet_lab2_expenses.Models
{
    public class CommentDtoConverter
    {
        public static IEnumerable<CommentDto> ConvertCommentsToDto(IEnumerable<Comment> comments)
        {
            return comments.Select(comm => new CommentDto
            {
                Text = comm.Text,
                Important = comm.Important
            });
        }
    }
}
