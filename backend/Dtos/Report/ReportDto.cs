using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Report
{
    public class ReportDto
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        [StringLength(50)]
        public string Type { get; set; } // e.g., "Daily", "Weekly", "Monthly", "Custom"

        [StringLength(20)]
        public string Status { get; set; } // e.g., "Draft", "Submitted", "Approved", "Rejected"

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Tags { get; set; } // Comma-separated tags for categorization

        public string AiSummary { get; set; } // AI-generated summary of the report content

        public string Metrics { get; set; } // JSON string containing report metrics and KPIs
    }

    public class CreateReportDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [StringLength(50)]
        public string Type { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Tags { get; set; }

        public string Metrics { get; set; }
    }

    public class UpdateReportDto
    {
        [Required]
        public int Id { get; set; }

        [StringLength(100)]
        public string Title { get; set; }

        public string Content { get; set; }

        [StringLength(50)]
        public string Type { get; set; }

        [StringLength(20)]
        public string Status { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Tags { get; set; }

        public string Metrics { get; set; }
    }
} 