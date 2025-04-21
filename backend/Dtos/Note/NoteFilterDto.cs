using System;
using backend.Dtos.Common;

namespace backend.Dtos.Note
{
    public class NoteFilterDto : BaseFilterDto
    {
        public int? CustomerId { get; set; }
        public int? UserId { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public bool? IsPrivate { get; set; }
        public string Tags { get; set; }
        public DateTime? CreatedAfter { get; set; }
        public DateTime? CreatedBefore { get; set; }
        public DateTime? UpdatedAfter { get; set; }
        public DateTime? UpdatedBefore { get; set; }
        public bool? HasAiSummary { get; set; }
    }
} 