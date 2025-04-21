using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Industry { get; set; }
        public string Website { get; set; }
        public DateTime Established { get; set; }

        // Navigation property
        public ICollection<Customer> Customers { get; set; }
    }
}