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
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public SettingsController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Settings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Settings>>> GetSettings()
        {
            return await _context.Settings
                .Include(s => s.User)
                .ToListAsync();
        }

        // GET: api/Settings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Settings>> GetSettings(int id)
        {
            var settings = await _context.Settings
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (settings == null)
            {
                return NotFound();
            }

            return settings;
        }

        // POST: api/Settings
        [HttpPost]
        public async Task<ActionResult<Settings>> CreateSettings(Settings settings)
        {
            // Verify that User exists
            var user = await _context.Users.FindAsync(settings.UserId);
            if (user == null)
            {
                return BadRequest("Invalid UserId");
            }

            // Check if user already has settings
            var existingSettings = await _context.Settings
                .FirstOrDefaultAsync(s => s.UserId == settings.UserId);
            if (existingSettings != null)
            {
                return BadRequest("User already has settings");
            }

            _context.Settings.Add(settings);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSettings), new { id = settings.Id }, settings);
        }

        // PUT: api/Settings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSettings(int id, Settings settings)
        {
            if (id != settings.Id)
            {
                return BadRequest();
            }

            // Verify that User exists
            var user = await _context.Users.FindAsync(settings.UserId);
            if (user == null)
            {
                return BadRequest("Invalid UserId");
            }

            _context.Entry(settings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SettingsExists(id))
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

        // DELETE: api/Settings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSettings(int id)
        {
            var settings = await _context.Settings.FindAsync(id);
            if (settings == null)
            {
                return NotFound();
            }

            _context.Settings.Remove(settings);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Settings/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<Settings>> GetSettingsByUser(int userId)
        {
            var settings = await _context.Settings
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.UserId == userId.ToString());

            if (settings == null)
            {
                return NotFound();
            }

            return settings;
        }

        private bool SettingsExists(int id)
        {
            return _context.Settings.Any(e => e.Id == id);
        }
    }
} 