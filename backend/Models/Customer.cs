using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreateDate { get; set; }
        public int CompanyId { get; set; }
        public string Status { get; set; }
        public decimal CustomerValue { get; set; } // Customer value in dollars
        public string Position { get; set; } // Customer's position

        // Navigation properties
        public Company Company { get; set; }
        public ICollection<Activity> Activities { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
} 