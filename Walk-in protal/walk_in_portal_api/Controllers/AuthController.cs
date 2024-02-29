using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using walk_in_portal_api.Model;
using walk_in_portal_api.Services;
using static System.Net.Mime.MediaTypeNames;

namespace walk_in_portal_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _config;
        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<LoginModel>> LoginController([FromServices] MySqlConnection connection, [FromBody]LoginModel loginDetails)
        {   
            try
            {

                LoginResponseModel? user = await connection.QueryFirstOrDefaultAsync<LoginResponseModel>("select users.user_id as id,users.first_name,users.last_name, users.user_image_url,user_login.user_password as password from users join user_login on users.user_id = user_login.user_id where users.email_id = '" + loginDetails.email + "';");
                if (user == null)
                    return BadRequest("Invalid Email Id");
                byte[] salt = HashService.salt;
                if (!VerifyPassword(loginDetails.password, user.password, salt))
                    return BadRequest("Invalid Password");
                user.token = generateToken(user.first_name,loginDetails.rememberMe);
                return Ok(user);
            }catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("login-by-token")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult> LoginByTokenController()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }


        private string generateToken(string first_name,bool rememberMe)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,first_name)
            };
            var expiresOn = DateTime.Now.AddHours(1);
            if(rememberMe)
                expiresOn = DateTime.Now.AddDays(2);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: expiresOn,
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        private static bool VerifyPassword(string password, string hash, byte[] salt)
        {
            
                const int keySize = 64;
                const int iterations = 30000;
                HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
                var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);
            return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(hash));
        }
    }
}
