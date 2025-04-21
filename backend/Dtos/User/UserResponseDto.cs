using System.Collections.Generic;
using backend.Dtos.Common;
using backend.Dtos.User;

namespace backend.Dtos.User
{
    public class UserResponseDto : PagedResponseDto<UserDto>
    {
        public Dictionary<string, int> RoleCounts { get; set; }
        public Dictionary<string, int> StatusCounts { get; set; }
        public Dictionary<string, int> DepartmentCounts { get; set; }
        public Dictionary<string, int> CountryCounts { get; set; }
        public int TotalActiveUsers { get; set; }
        public int TotalInactiveUsers { get; set; }
        public int UsersWithProfilePicture { get; set; }
        public int UsersWithCustomPreferences { get; set; }
        public int AverageUserAge { get; set; } // Days since creation
        public int UsersWithRecentActivity { get; set; }
    }
} 