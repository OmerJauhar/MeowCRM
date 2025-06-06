using System;

namespace backend.Dtos.Activity
{
    public class ActivityDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string UserId { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string AiSummary { get; set; }
    }
}