using System.Text.Json;
using TheraConnectBackend.Models;

var builder = WebApplication.CreateBuilder(args);

// Read the JSON file
var therapists = new List<Therapist>();
var filePath = Path.Combine(Directory.GetCurrentDirectory(), "data", "therapists.json");

if (File.Exists(filePath))
{
    var jsonData = File.ReadAllText(filePath);
    therapists = JsonSerializer.Deserialize<List<Therapist>>(jsonData);
}
else
{
    Console.WriteLine("Therapists data file not found.");
}

// Add the list to the dependency injection container
builder.Services.AddSingleton(therapists);

var bookings = new List<Booking>();
builder.Services.AddSingleton(bookings);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Allow frontend URL
                  .AllowAnyMethod() // Allow GET, POST, PUT, DELETE, etc.
                  .AllowAnyHeader() // Allow any headers
                  .AllowCredentials(); // Allow credentials (if needed)
        });
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();