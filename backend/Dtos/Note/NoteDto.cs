using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Note
{
    public class NoteDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
    }
} 