using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PrApi.Models;

namespace PrApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReferralsController : ControllerBase
    {
        // Static in-memory list for demo purposes
        private static readonly List<Referral> _referrals = new List<Referral>
        {
            new Referral { Id = "REF-1001", PatientName = "Rahul Sharma", Age = 45, Gender = "Male", Phone = "9876543210", Department = "Cardiology", Date = "2024-05-10", Status = "Admitted", Priority = "Urgent" },
            new Referral { Id = "REF-1002", PatientName = "Priya Patel", Age = 32, Gender = "Female", Phone = "8765432109", Department = "Orthopedics", Date = "2024-05-11", Status = "Pending", Priority = "Normal" },
            new Referral { Id = "REF-1003", PatientName = "Anil Kumar", Age = 58, Gender = "Male", Phone = "7654321098", Department = "Neurology", Date = "2024-05-12", Status = "Discharged", Priority = "Normal" },
            new Referral { Id = "REF-1004", PatientName = "Sneha Reddy", Age = 28, Gender = "Female", Phone = "6543210987", Department = "Gynecology", Date = "2024-05-13", Status = "Rejected", Priority = "Normal" },
            new Referral { Id = "REF-1005", PatientName = "Vikram Singh", Age = 50, Gender = "Male", Phone = "9988776655", Department = "Cardiology", Date = "2024-05-14", Status = "Admitted", Priority = "Urgent" }
        };

        [HttpGet]
        public IActionResult GetReferrals()
        {
            // Order by descending ID for latest first
            var result = _referrals.OrderByDescending(r => r.Id).ToList();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateReferral([FromBody] Referral referral)
        {
            if (referral == null || string.IsNullOrEmpty(referral.PatientName))
            {
                return BadRequest("Invalid referral data.");
            }

            // Generate ID and default values
            referral.Id = $"REF-{1000 + _referrals.Count + 1}";
            referral.Date = DateTime.Now.ToString("yyyy-MM-dd");
            referral.Status = "Pending";

            _referrals.Add(referral);

            return CreatedAtAction(nameof(GetReferrals), new { id = referral.Id }, referral);
        }
    }
}
