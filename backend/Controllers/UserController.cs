using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<User> _userManager;

        public UserController(ApplicationDBContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userManager.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var existingUser = await _userManager.FindByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Email = user.Email;
            existingUser.UserName = user.UserName;
            existingUser.LastLogin = user.LastLogin;

            var result = await _userManager.UpdateAsync(existingUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<User>> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("username/{username}")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
} 