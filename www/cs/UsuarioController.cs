using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace CalmClass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string connectionString = "Server=SEU_SERVIDOR;Database=CalmClass;User Id=SEU_USUARIO;Password=SUA_SENHA;";

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "INSERT INTO Users (Username, Email, Password, BirthDate) VALUES (@Username, @Email, @Password, @BirthDate)";
                    SqlCommand command = new SqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Username", user.Username);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@BirthDate", user.BirthDate);

                    int result = command.ExecuteNonQuery();
                    return Ok(new { success = result > 0 });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM Users WHERE Username = @Username AND Password = @Password";
                    SqlCommand command = new SqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Username", login.Username);
                    command.Parameters.AddWithValue("@Password", login.Password);

                    int result = (int)command.ExecuteScalar();
                    return result > 0 ? Ok(new { success = true }) : Unauthorized(new { error = "Invalid credentials" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

    public class User
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
