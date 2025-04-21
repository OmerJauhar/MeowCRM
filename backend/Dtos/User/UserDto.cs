using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.User
{
    public class UserDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; } // e.g., "Admin", "Manager", "User"

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? LastLoginAt { get; set; }

        [StringLength(20)]
        public string Status { get; set; } // e.g., "Active", "Inactive", "Suspended"

        [StringLength(100)]
        public string Department { get; set; }

        [StringLength(100)]
        public string JobTitle { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        public string ProfilePicture { get; set; } // URL or base64 string

        public string Preferences { get; set; } // JSON string containing user preferences

        public string Permissions { get; set; } // JSON string containing user permissions
    }

    public class CreateUserDto
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [StringLength(100)]
        public string Department { get; set; }

        [StringLength(100)]
        public string JobTitle { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }
    }

    public class UpdateUserDto
    {
        [Required]
        public int Id { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(20)]
        public string Role { get; set; }

        [StringLength(100)]
        public string Department { get; set; }

        [StringLength(100)]
        public string JobTitle { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        public string Status { get; set; }

        public string ProfilePicture { get; set; }

        public string Preferences { get; set; }

        public string Permissions { get; set; }
    }

    public class ChangePasswordDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string CurrentPassword { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }
    }
} 