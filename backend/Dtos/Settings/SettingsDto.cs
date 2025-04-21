using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Settings
{
    public class SettingsDto
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Theme { get; set; } // e.g., "Light", "Dark", "System"

        [Required]
        public string Language { get; set; } // e.g., "en-US", "es-ES", "fr-FR"

        [Required]
        public string TimeZone { get; set; } // e.g., "UTC", "America/New_York"

        [Required]
        public string DateFormat { get; set; } // e.g., "MM/DD/YYYY", "DD/MM/YYYY"

        [Required]
        public string TimeFormat { get; set; } // e.g., "12h", "24h"

        public bool EmailNotifications { get; set; }

        public bool PushNotifications { get; set; }

        public string NotificationPreferences { get; set; } // JSON string containing notification settings

        public string DashboardLayout { get; set; } // JSON string containing dashboard widget layout

        public string AiPreferences { get; set; } // JSON string containing AI-related settings

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateSettingsDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Theme { get; set; }

        [Required]
        public string Language { get; set; }

        [Required]
        public string TimeZone { get; set; }

        [Required]
        public string DateFormat { get; set; }

        [Required]
        public string TimeFormat { get; set; }

        public bool EmailNotifications { get; set; }

        public bool PushNotifications { get; set; }

        public string NotificationPreferences { get; set; }

        public string DashboardLayout { get; set; }

        public string AiPreferences { get; set; }
    }

    public class UpdateSettingsDto
    {
        [Required]
        public int Id { get; set; }

        public string Theme { get; set; }

        public string Language { get; set; }

        public string TimeZone { get; set; }

        public string DateFormat { get; set; }

        public string TimeFormat { get; set; }

        public bool? EmailNotifications { get; set; }

        public bool? PushNotifications { get; set; }

        public string NotificationPreferences { get; set; }

        public string DashboardLayout { get; set; }

        public string AiPreferences { get; set; }
    }
} 