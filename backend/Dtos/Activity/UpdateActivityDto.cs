using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Activity
{
    public class UpdateActivityDto
    {
        [StringLength(50)]
        public string Type { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public string AiSummary { get; set; }
    }
} 