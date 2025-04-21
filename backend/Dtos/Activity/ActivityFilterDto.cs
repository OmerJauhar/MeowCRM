using System;
using backend.Dtos.Common;

namespace backend.Dtos.Activity
{
    public class ActivityFilterDto : BaseFilterDto
    {
        public int? CustomerId { get; set; }
        public int? UserId { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string Location { get; set; }
        public string Tags { get; set; }
        public bool? HasFollowUp { get; set; }
        public int? MinDuration { get; set; }
        public int? MaxDuration { get; set; }
    }
} 