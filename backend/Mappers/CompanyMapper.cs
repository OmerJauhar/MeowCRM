using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;
using backend.Dtos.Company;

namespace backend.Mappers
{
    public static class CompanyMapper
    {
        public static CompanyDto ToDto(this Company company)
        {
            if (company == null) return null;

            return new CompanyDto
            {
                Id = company.Id,
                Name = company.Name,
                Industry = company.Industry,
                Website = company.Website,
                Established = company.Established
            };
        }

        public static Company ToModel(this CreateCompanyDto dto)
        {
            if (dto == null) return null;

            return new Company
            {
                Name = dto.Name,
                Industry = dto.Industry,
                Website = dto.Website,
                Established = dto.Established
            };
        }

        public static Company ToModel(this UpdateCompanyDto dto, Company existingCompany)
        {
            if (dto == null || existingCompany == null) return null;

            existingCompany.Name = dto.Name ?? existingCompany.Name;
            existingCompany.Industry = dto.Industry ?? existingCompany.Industry;
            existingCompany.Website = dto.Website ?? existingCompany.Website;
            existingCompany.Established = dto.Established ?? existingCompany.Established;

            return existingCompany;
        }

        public static List<CompanyDto> ToDtoList(this IEnumerable<Company> companies)
        {
            return companies?.Select(c => c.ToDto()).ToList();
        }
    }
} 