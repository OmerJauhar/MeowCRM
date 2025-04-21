using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Note
{
    public class CreateNoteDto
    {
        [Required]
        public int CustomerId { get; set; }

        [Required]
        public string Content { get; set; }
    }
} 