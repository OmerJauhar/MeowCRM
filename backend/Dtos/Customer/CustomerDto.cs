using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Customer
{
    public class CustomerDto
    {
        public int Id { get; set; }

        [Required]
        public int CompanyId { get; set; }

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
        public string Phone { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } // e.g., "Active", "Inactive", "Prospect"

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(100)]
        public string City { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(20)]
        public string ZipCode { get; set; }

        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(100)]
        public string JobTitle { get; set; }

        [StringLength(100)]
        public string Department { get; set; }

        public DateTime? LastContactDate { get; set; }

        public string Notes { get; set; }

        public string Source { get; set; } // How the customer was acquired

        public string Tags { get; set; } // Comma-separated tags for categorization

        public decimal CustomerValue { get; set; } // Customer value in dollars

        public string Position { get; set; } // Customer's position
    }

    public class CreateCustomerDto
    {
        [Required]
        public int CompanyId { get; set; }

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
        public string Phone { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(100)]
        public string City { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(20)]
        public string ZipCode { get; set; }

        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(100)]
        public string JobTitle { get; set; }

        [StringLength(100)]
        public string Department { get; set; }

        public string Source { get; set; }

        public string Tags { get; set; }

        public decimal? CustomerValue { get; set; } // Customer value in dollars

        public string Position { get; set; } // Customer's position
    }

    public class UpdateCustomerDto
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
        public string Phone { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(100)]
        public string City { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(20)]
        public string ZipCode { get; set; }

        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(100)]
        public string JobTitle { get; set; }

        [StringLength(100)]
        public string Department { get; set; }

        public string Status { get; set; }

        public string Notes { get; set; }

        public string Tags { get; set; }

        public decimal? CustomerValue { get; set; } // Customer value in dollars

        public string Position { get; set; } // Customer's position
    }

    public class CustomerPostApiDto
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
        public int CompanyId { get; set; }

        [StringLength(100)]
        public string Position { get; set; }

        [Required]
        [StringLength(20)]
        public string Phone { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        public decimal CustomerValue { get; set; }
    }
} 