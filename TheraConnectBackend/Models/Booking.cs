namespace TheraConnectBackend.Models
{
    public class Booking
    {
        public int TherapistId { get; set; }
        public string ClientName { get; set; }
        public DateTime SessionTime { get; set; }
        public string Status { get; set; } // e.g., "Confirmed", "Pending"
    }
}