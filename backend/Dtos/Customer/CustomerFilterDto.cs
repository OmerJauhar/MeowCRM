using System;
using backend.Dtos.Common;

namespace backend.Dtos.Customer
{
    public class CustomerFilterDto : BaseFilterDto
    {
        public int? CompanyId { get; set; }
        public string Status { get; set; }
        public string Department { get; set; }
        public string JobTitle { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Source { get; set; }
        public string Tags { get; set; }
        public DateTime? LastContactAfter { get; set; }
        public DateTime? LastContactBefore { get; set; }
        public DateTime? CreatedAfter { get; set; }
        public DateTime? CreatedBefore { get; set; }
    }
} 