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
    public class NoteController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public NoteController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Note
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes
                .Include(n => n.Customer)
                .ToListAsync();
        }

        // GET: api/Note/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            var note = await _context.Notes
                .Include(n => n.Customer)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // POST: api/Note
        [HttpPost]
        public async Task<ActionResult<Note>> CreateNote(Note note)
        {
            // Verify that Customer exists
            var customer = await _context.Customers.FindAsync(note.CustomerId);
            if (customer == null)
            {
                return BadRequest("Invalid CustomerId");
            }

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }

        // PUT: api/Note/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            // Verify that Customer exists
            var customer = await _context.Customers.FindAsync(note.CustomerId);
            if (customer == null)
            {
                return BadRequest("Invalid CustomerId");
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
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

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Note/customer/5
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotesByCustomer(int customerId)
        {
            return await _context.Notes
                .Where(n => n.CustomerId == customerId)
                .Include(n => n.Customer)
                .ToListAsync();
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
} 