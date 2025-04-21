using System;
using backend.Dtos.Common;

namespace backend.Dtos.Company
{
    public class CompanyFilterDto : BaseFilterDto
    {
        public string Industry { get; set; }
        public string Status { get; set; }
        public int? MinEmployeeCount { get; set; }
        public int? MaxEmployeeCount { get; set; }
        public decimal? MinAnnualRevenue { get; set; }
        public decimal? MaxAnnualRevenue { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public DateTime? EstablishedAfter { get; set; }
        public DateTime? EstablishedBefore { get; set; }
    }
} 