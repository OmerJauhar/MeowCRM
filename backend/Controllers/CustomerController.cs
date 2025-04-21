using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Dtos.Customer;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public CustomerController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers
                .Include(c => c.Company)
                .Include(c => c.Activities)
                .Include(c => c.Notes)
                .ToListAsync();
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.Company)
                .Include(c => c.Activities)
                .Include(c => c.Notes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer(CustomerPostApiDto customerDto)
        {
            // Verify that Company exists
            var company = await _context.Companies.FindAsync(customerDto.CompanyId);
            if (company == null)
            {
                return BadRequest("Invalid CompanyId");
            }

            var customer = new Customer
            {
                FirstName = customerDto.FirstName,
                LastName = customerDto.LastName,
                Email = customerDto.Email,
                CompanyId = customerDto.CompanyId,
                Position = customerDto.Position,
                Phone = customerDto.Phone,
                Status = customerDto.Status,
                CustomerValue = customerDto.CustomerValue,
                CreateDate = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            // Verify that Company exists
            var company = await _context.Companies.FindAsync(customer.CompanyId);
            if (company == null)
            {
                return BadRequest("Invalid CompanyId");
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.Activities)
                .Include(c => c.Notes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            // Check if customer has any activities or notes
            if (customer.Activities.Any() || customer.Notes.Any())
            {
                return BadRequest("Cannot delete customer with existing activities or notes");
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Customer/company/5
        [HttpGet("company/{companyId}")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersByCompany(int companyId)
        {
            return await _context.Customers
                .Where(c => c.CompanyId == companyId)
                .Include(c => c.Company)
                .Include(c => c.Activities)
                .Include(c => c.Notes)
                .ToListAsync();
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersByFilter(decimal? minValue, decimal? maxValue, string status)
        {
            var query = _context.Customers.AsQueryable();

            if (minValue.HasValue)
            {
                query = query.Where(c => c.CustomerValue >= minValue.Value);
            }

            if (maxValue.HasValue)
            {
                query = query.Where(c => c.CustomerValue <= maxValue.Value);
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(c => c.Status == status);
            }

            return await query.ToListAsync();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
} 