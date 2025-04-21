using System;
using backend.Dtos.Common;

namespace backend.Dtos.Report
{
    public class ReportFilterDto : BaseFilterDto
    {
        public int? UserId { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Tags { get; set; }
        public DateTime? StartDateAfter { get; set; }
        public DateTime? StartDateBefore { get; set; }
        public DateTime? EndDateAfter { get; set; }
        public DateTime? EndDateBefore { get; set; }
        public bool? HasAiSummary { get; set; }
        public bool? HasMetrics { get; set; }
    }
} 