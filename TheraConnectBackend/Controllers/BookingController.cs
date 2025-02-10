using Microsoft.AspNetCore.Mvc;
using TheraConnectBackend.Models;

namespace TheraConnectBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly List<Booking> _bookings;

        public BookingController(List<Booking> bookings)
        {
            _bookings = bookings;
        }

        [HttpPost]
        public IActionResult BookSession([FromBody] Booking booking)
        {
            booking.Status = "Confirmed"; // Simulate a confirmed booking
            _bookings.Add(booking);
            return Ok(new { Message = "Booking confirmed!", Booking = booking });
        }
    }
}