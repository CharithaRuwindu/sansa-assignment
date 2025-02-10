namespace TheraConnectBackend.Models
{
    public class Therapist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Specialty { get; set; }
        public string Bio { get; set; }
        public string Availability { get; set; }
    }
}