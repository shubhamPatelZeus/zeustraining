using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using test.Models;

namespace test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet(Name = "GetTest")]
        public async Task<ActionResult<ResponseModel>> Get([FromServices] MySqlConnection connection) {
            try
            {
                ResponseModel model = await Task.Run(() => new ResponseModel("hey, its backend"));
                var application = connection.Query<string>("select users.user_id,users.first_name,users.last_name from users join user_login on users.user_id = user_login.user_id where users.email_id = \"a\" and user_login.user_password = \"a\";");
                if(application.FirstOrDefault() is string resume_url)
                Console.WriteLine(resume_url);
                return Ok(model);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            } }

        [HttpPost(Name = "PostTest")]
        public async Task<ActionResult<ResponseModel>> Post([FromBody]ResponseModel resModel) {
            try
            {
                Console.WriteLine(resModel.msg);
                ResponseModel model = await Task.Run(() => new ResponseModel(resModel.msg));

                return Ok(model);
            }catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating data in backend");
            }
        }
    }
}
