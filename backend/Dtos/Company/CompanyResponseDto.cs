using System.Collections.Generic;
using backend.Dtos.Common;
using backend.Dtos.Company;

namespace backend.Dtos.Company
{
    public class CompanyResponseDto : PagedResponseDto<CompanyDto>
    {
        public Dictionary<string, int> IndustryCounts { get; set; }
        public Dictionary<string, int> StatusCounts { get; set; }
        public Dictionary<string, int> CountryCounts { get; set; }
        public int TotalEmployees { get; set; }
        public decimal TotalRevenue { get; set; }
        public int AverageEmployeeCount { get; set; }
        public decimal AverageRevenue { get; set; }
    }
} 