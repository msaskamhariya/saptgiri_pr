using System;
using System.Threading.Tasks;
using BackendApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClinicsController : ControllerBase
    {
        private readonly IClinicRepository _clinicRepository;

        public ClinicsController(IClinicRepository clinicRepository)
        {
            _clinicRepository = clinicRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetClinics()
        {
            try
            {
                var clinics = await _clinicRepository.GetAllClinicsAsync();
                return Ok(clinics);
            }
            catch (Exception ex)
            {
                Console.WriteLine("GET CLINICS ERROR: " + ex.ToString());
                return StatusCode(500, "Database connection error.");
            }
        }
    }
}
