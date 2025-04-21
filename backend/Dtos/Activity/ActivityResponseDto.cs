using System.Collections.Generic;
using backend.Dtos.Common;
using backend.Dtos.Activity;

namespace backend.Dtos.Activity
{
    public class ActivityResponseDto : PagedResponseDto<ActivityDto>
    {
        public Dictionary<string, int> TypeCounts { get; set; }
        public Dictionary<string, int> StatusCounts { get; set; }
        public Dictionary<string, int> PriorityCounts { get; set; }
        public int TotalDuration { get; set; }
        public int AverageDuration { get; set; }
        public int PendingFollowUps { get; set; }
    }
} 