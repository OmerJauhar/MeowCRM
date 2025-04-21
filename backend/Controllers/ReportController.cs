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
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ReportController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Report
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetReports()
        {
            return await _context.Reports
                .Include(r => r.User)
                .ToListAsync();
        }

        // GET: api/Report/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var report = await _context.Reports
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

        // POST: api/Report
        [HttpPost]
        public async Task<ActionResult<Report>> CreateReport(Report report)
        {
            // Verify that User exists
            var user = await _context.Users.FindAsync(report.UserId);
            if (user == null)
            {
                return BadRequest("Invalid UserId");
            }

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
        }

        // PUT: api/Report/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReport(int id, Report report)
        {
            if (id != report.Id)
            {
                return BadRequest();
            }

            // Verify that User exists
            var user = await _context.Users.FindAsync(report.UserId);
            if (user == null)
            {
                return BadRequest("Invalid UserId");
            }

            _context.Entry(report).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportExists(id))
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

        // DELETE: api/Report/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Report/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Report>>> GetReportsByUser(int userId)
        {
            return await _context.Reports
                .Where(r => r.UserId == userId.ToString())
                .Include(r => r.User)
                .ToListAsync();
        }

        private bool ReportExists(int id)
        {
            return _context.Reports.Any(e => e.Id == id);
        }
    }
} 