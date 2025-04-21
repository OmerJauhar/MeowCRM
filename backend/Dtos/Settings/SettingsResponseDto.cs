using System.Collections.Generic;
using backend.Dtos.Common;
using backend.Dtos.Settings;

namespace backend.Dtos.Settings
{
    public class SettingsResponseDto : PagedResponseDto<SettingsDto>
    {
        public Dictionary<string, int> ThemeCounts { get; set; }
        public Dictionary<string, int> LanguageCounts { get; set; }
        public Dictionary<string, int> TimeZoneCounts { get; set; }
        public int UsersWithEmailNotifications { get; set; }
        public int UsersWithPushNotifications { get; set; }
        public int UsersWithCustomDashboard { get; set; }
        public int UsersWithAiPreferences { get; set; }
        public Dictionary<string, int> NotificationPreferenceCounts { get; set; }
    }
} 