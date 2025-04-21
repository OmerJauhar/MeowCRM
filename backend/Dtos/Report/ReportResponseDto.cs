using System.Collections.Generic;
using backend.Dtos.Common;
using backend.Dtos.Report;

namespace backend.Dtos.Report
{
    public class ReportResponseDto : PagedResponseDto<ReportDto>
    {
        public Dictionary<string, int> TypeCounts { get; set; }
        public Dictionary<string, int> StatusCounts { get; set; }
        public int TotalReports { get; set; }
        public int ReportsWithAiSummary { get; set; }
        public int ReportsWithMetrics { get; set; }
        public Dictionary<string, int> TagCounts { get; set; }
        public int AverageReportLength { get; set; }
        public Dictionary<string, int> MetricsSummary { get; set; }
    }
} 