using System;
using System.Threading.Tasks;
using BackendApi.Models;
using BackendApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAgentRepository _agentRepository;

        public AuthController(IAgentRepository agentRepository)
        {
            _agentRepository = agentRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { success = false, message = "Username and password are required." });
            }

            try
            {
                var agent = await _agentRepository.GetAgentByUsernameAsync(request.Username);

                // In a real application, you should hash the incoming password and compare it to agent.PasswordHash
                // For demo purposes, we do a direct check or mock check if the DB is not wired up yet
                if (agent != null && agent.PasswordHash == request.Password) 
                {
                    return Ok(new 
                    { 
                        success = true, 
                        user = new 
                        { 
                            id = agent.Id,
                            username = agent.Username, 
                            name = agent.Name, 
                            role = agent.Role 
                        },
                        token = "mock-jwt-token-for-demo"
                    });
                }
                
                return Unauthorized(new { success = false, message = "Invalid username or password" });
            }
            catch (Exception ex)
            {
                Console.WriteLine("LOGIN ERROR: " + ex.ToString());
                return StatusCode(500, new { success = false, message = "Database connection error." });
            }
        }
    }
}
