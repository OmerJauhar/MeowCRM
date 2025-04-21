using System;
using backend.Dtos.Common;

namespace backend.Dtos.Settings
{
    public class SettingsFilterDto : BaseFilterDto
    {
        public int? UserId { get; set; }
        public string Theme { get; set; }
        public string Language { get; set; }
        public string TimeZone { get; set; }
        public bool? EmailNotifications { get; set; }
        public bool? PushNotifications { get; set; }
        public bool? HasNotificationPreferences { get; set; }
        public bool? HasDashboardLayout { get; set; }
        public bool? HasAiPreferences { get; set; }
    }
} 