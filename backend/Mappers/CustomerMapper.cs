using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;
using backend.Dtos.Customer;

namespace backend.Mappers
{
    public static class CustomerMapper
    {
        public static CustomerDto ToDto(this Customer customer)
        {
            if (customer == null) return null;

            return new CustomerDto
            {
                Id = customer.Id,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Phone = customer.Phone,
                CreateDate = customer.CreateDate,
                CompanyId = customer.CompanyId,
                Status = customer.Status,
                CustomerValue = customer.CustomerValue,
                Position = customer.Position
            };
        }

        public static Customer ToModel(this CreateCustomerDto dto)
        {
            if (dto == null) return null;

            return new Customer
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                CreateDate = DateTime.UtcNow,
                CompanyId = dto.CompanyId,
                Status = "Active",
                CustomerValue = dto.CustomerValue ?? 0m,
                Position = dto.Position
            };
        }

        public static Customer ToModel(this UpdateCustomerDto dto, Customer existingCustomer)
        {
            if (dto == null || existingCustomer == null) return null;

            existingCustomer.FirstName = dto.FirstName ?? existingCustomer.FirstName;
            existingCustomer.LastName = dto.LastName ?? existingCustomer.LastName;
            existingCustomer.Email = dto.Email ?? existingCustomer.Email;
            existingCustomer.Phone = dto.Phone ?? existingCustomer.Phone;
            existingCustomer.Status = dto.Status ?? existingCustomer.Status;
            existingCustomer.CustomerValue = dto.CustomerValue ?? existingCustomer.CustomerValue;
            existingCustomer.Position = dto.Position ?? existingCustomer.Position;

            return existingCustomer;
        }

        public static List<CustomerDto> ToDtoList(this IEnumerable<Customer> customers)
        {
            return customers?.Select(c => c.ToDto()).ToList();
        }
    }
} 