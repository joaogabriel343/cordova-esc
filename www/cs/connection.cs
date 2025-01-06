using System;
using System.Data.SqlClient;

namespace CalmClassAPI
{
    public class DatabaseConnection
    {
        private readonly string connectionString = "Server=DESKTOP-DIFT32I\\SQLEXPRESS;Database=CalmClassDB;Trusted_Connection=True;";

        public bool RegistrarUsuario(string usuario, DateTime dataNascimento, string email, string senha)
        {
            string query = "INSERT INTO Usuarios (Usuario, DataNascimento, Email, Senha) VALUES (@Usuario, @DataNascimento, @Email, @Senha)";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Usuario", usuario);
                        command.Parameters.AddWithValue("@DataNascimento", dataNascimento);
                        command.Parameters.AddWithValue("@Email", email);
                        command.Parameters.AddWithValue("@Senha", BCrypt.Net.BCrypt.HashPassword(senha)); 

                        command.ExecuteNonQuery();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao registrar usuário: {ex.Message}");
                return false;
            }
        }

        public bool ValidarLogin(string usuario, string senha)
        {
            string query = "SELECT Senha FROM Usuarios WHERE Usuario = @Usuario";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Usuario", usuario);
                        string hashedPassword = (string)command.ExecuteScalar();

                        if (hashedPassword != null && BCrypt.Net.BCrypt.Verify(senha, hashedPassword))
                        {
                            return true; 
                        }
                    }
                }
                return false; 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao validar login: {ex.Message}");
                return false;
            }
        }
    }
}
