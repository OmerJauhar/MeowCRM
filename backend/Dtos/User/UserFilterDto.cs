using System;
using backend.Dtos.Common;

namespace backend.Dtos.User
{
    public class UserFilterDto : BaseFilterDto
    {
        public string Role { get; set; }
        public string Status { get; set; }
        public string Department { get; set; }
        public string JobTitle { get; set; }
        public string Country { get; set; }
        public DateTime? LastLoginAfter { get; set; }
        public DateTime? LastLoginBefore { get; set; }
        public DateTime? CreatedAfter { get; set; }
        public DateTime? CreatedBefore { get; set; }
        public bool? HasProfilePicture { get; set; }
        public bool? HasPreferences { get; set; }
        public bool? HasPermissions { get; set; }
    }
} 