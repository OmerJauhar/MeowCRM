using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }

        // Navigation property
        public Customer Customer { get; set; }
    }
} 