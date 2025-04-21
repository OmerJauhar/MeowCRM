using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ActivityController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Activity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            return await _context.Activities
                .Include(a => a.Customer)
                .Include(a => a.User)
                .ToListAsync();
        }

        // GET: api/Activity/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int id)
        {
            var activity = await _context.Activities
                .Include(a => a.Customer)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        // POST: api/Activity
        [HttpPost]
        public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
        {
            // Verify that Customer and User exist
            var customer = await _context.Customers.FindAsync(activity.CustomerId);
            var user = await _context.Users.FindAsync(activity.UserId);

            if (customer == null || user == null)
            {
                return BadRequest("Invalid CustomerId or UserId");
            }

            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);
        }

        // PUT: api/Activity/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(int id, Activity activity)
        {
            if (id != activity.Id)
            {
                return BadRequest();
            }

            // Verify that Customer and User exist
            var customer = await _context.Customers.FindAsync(activity.CustomerId);
            var user = await _context.Users.FindAsync(activity.UserId);

            if (customer == null || user == null)
            {
                return BadRequest("Invalid CustomerId or UserId");
            }

            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
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

        // DELETE: api/Activity/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Activity/customer/5
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesByCustomer(int customerId)
        {
            return await _context.Activities
                .Where(a => a.CustomerId == customerId)
                .Include(a => a.Customer)
                .Include(a => a.User)
                .ToListAsync();
        }

        // GET: api/Activity/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesByUser(int userId)
        {
            return await _context.Activities
                .Where(a => a.UserId == userId.ToString())
                .Include(a => a.Customer)
                .Include(a => a.User)
                .ToListAsync();
        }

        private bool ActivityExists(int id)
        {
            return _context.Activities.Any(e => e.Id == id);
        }
    }
}