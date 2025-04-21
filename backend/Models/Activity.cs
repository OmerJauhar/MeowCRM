using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string AiSummary { get; set; }

        // Navigation properties
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
} 