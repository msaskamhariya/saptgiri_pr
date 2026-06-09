using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using BackendApi.Models;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace BackendApi.Repositories
{
    public interface IAgentRepository
    {
        Task<Agent> GetAgentByUsernameAsync(string username);
    }

    public class AgentRepository : IAgentRepository
    {
        private readonly string _connectionString;

        public AgentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<Agent> GetAgentByUsernameAsync(string username)
        {
            // Simple query, 2008 R2 compatible
            const string sql = @"
                SELECT 
                    UserId AS Id, 
                    UserName AS Username, 
                    Password AS PasswordHash, 
                    UserName AS Name, 
                    'PR_AGENT' AS Role, 
                    1 AS IsActive
                FROM 
                    New_Users 
                WHERE 
                    UserName = @Username";

            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QuerySingleOrDefaultAsync<Agent>(sql, new { Username = username });
            }
        }
    }
}
