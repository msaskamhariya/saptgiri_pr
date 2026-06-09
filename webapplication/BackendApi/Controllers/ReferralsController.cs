using System;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using BackendApi.Models;
using BackendApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReferralsController : ControllerBase
    {
        private readonly IReferralRepository _referralRepository;

        public ReferralsController(IReferralRepository referralRepository)
        {
            _referralRepository = referralRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetReferrals([FromQuery] int agentId = 1)
        {
            try
            {
                var referrals = await _referralRepository.GetAllReferralsAsync(agentId);
                return Ok(referrals);
            }
            catch (Exception ex)
            {
                Console.WriteLine("GET REFERRALS ERROR: " + ex.ToString());
                return StatusCode(500, "Database connection error.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateReferral([FromBody] ReferralCreateDto referral)
        {
            if (referral == null || string.IsNullOrEmpty(referral.PatientName))
            {
                return BadRequest("Invalid referral data.");
            }

            // Fallback agent Id if not provided
            if (referral.AgentId <= 0) referral.AgentId = 1;

            try
            {
                var result = await _referralRepository.CreateReferralAsync(referral);
                
                var createdReferral = new ExternalReferral
                {
                    Id = result.Id,
                    ReferenceNumber = result.ReferenceNumber,
                    PatientName = referral.PatientName,
                    Age = referral.Age,
                    Gender = referral.Gender,
                    Phone = referral.Phone,
                    Department = referral.Department,
                    Priority = referral.Priority,
                    Notes = referral.Notes,
                    Status = "Pending",
                    CreatedAt = DateTime.Now,
                    AgentId = referral.AgentId,
                    CommissionAmount = null,
                    CommissionStatus = "Pending",
                    ClinicName = referral.ClinicName
                };

                return CreatedAtAction(nameof(GetReferrals), new { id = result.Id }, createdReferral);
            }
            catch (Exception ex)
            {
                System.IO.File.WriteAllText("error.txt", ex.ToString());
                Console.WriteLine("CREATE REFERRAL ERROR: " + ex.ToString());
                return StatusCode(500, "Database connection error.");
            }
        }
    }
}
