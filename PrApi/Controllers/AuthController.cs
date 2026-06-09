using Microsoft.AspNetCore.Mvc;
using PrApi.Models;

namespace PrApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { success = false, message = "Username and password are required." });
            }

            // Demo credentials check
            if ((request.Username == "agent01" && request.Password == "saptgiri2024") || 
                (request.Username == "prdesk" && request.Password == "hospital@123"))
            {
                // In a real app, you would return a JWT here
                return Ok(new 
                { 
                    success = true, 
                    user = new 
                    { 
                        username = request.Username, 
                        name = request.Username == "agent01" ? "Agent 01" : "PR Desk", 
                        role = "PR_AGENT" 
                    },
                    token = "mock-jwt-token-for-demo"
                });
            }

            return Unauthorized(new { success = false, message = "Invalid username or password" });
        }
    }
}
