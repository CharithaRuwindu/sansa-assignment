using Microsoft.AspNetCore.Mvc;
using TheraConnectBackend.Models;

namespace TheraConnectBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TherapistController : ControllerBase
    {
        private readonly List<Therapist> _therapists;

        public TherapistController(List<Therapist> therapists)
        {
            _therapists = therapists;
        }

        [HttpGet]
        public IActionResult GetTherapists()
        {
            return Ok(_therapists);
        }

        [HttpPost("search")]
        public IActionResult SearchTherapists([FromBody] SearchCriteria criteria)
        {
            var results = _therapists
                .Where(t => t.Specialty.Contains(criteria.Specialty, StringComparison.OrdinalIgnoreCase))
                .ToList();

            return Ok(results);
        }
    }
}