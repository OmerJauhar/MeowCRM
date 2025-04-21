using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Settings
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public string Theme { get; set; }
        public string Language { get; set; }
        public bool NotificationsEnabled { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
} 