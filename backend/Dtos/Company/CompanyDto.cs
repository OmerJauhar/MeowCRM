using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Company
{
    public class CompanyDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Industry { get; set; }

        [Required]
        [StringLength(200)]
        public string Website { get; set; }

        [Required]
        public DateTime Established { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(100)]
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

        public int? EmployeeCount { get; set; }

        public decimal? AnnualRevenue { get; set; }

        public string Status { get; set; } // e.g., "Active", "Inactive", "Prospect"

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateCompanyDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Industry { get; set; }

        [Required]
        [StringLength(200)]
        public string Website { get; set; }

        [Required]
        public DateTime Established { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(100)]
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
    }

    public class UpdateCompanyDto
    {
        [Required]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Industry { get; set; }

        [StringLength(200)]
        public string Website { get; set; }

        public DateTime? Established { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(100)]
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

        public string Status { get; set; }
    }
} 