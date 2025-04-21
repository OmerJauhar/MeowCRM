using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public DateTime LastLogin { get; set; }

        // Navigation properties
        public ICollection<Activity> Activities { get; set; }
        public ICollection<Report> Reports { get; set; }
        public Settings Settings { get; set; }
    }
} 