using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MicroUser.Models;
using MicroUser.Repository;

namespace MicroUser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            var finalResults = await _userRepository.GetUsers();
            return Ok(finalResults);

        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _userRepository.GetUserByID(id);
            return new OkObjectResult(user);
        }

        // POST: api/User
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            _userRepository.InsertUser(user);

            return new OkResult();
        }

        // PUT: api/User
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] User user)
        {
            User u = await _userRepository.GetUserByID(user.Id);

            if (u != null)
            {
                u.Username = user.Username;
                u.Password = user.Password;
                u.Email = user.Email;
                u.Usertype = user.Usertype;
                _userRepository.UpdateUser(u);
            }

            return new OkResult();
        }


        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.DeleteUser(id);
            return new OkResult();
        }

        // GET: api/User/Login
        [HttpGet("/cerca/{Username}")]
        public async Task<ActionResult<User>> getByUsername(string Username)
        {
            var user = await _userRepository.GetUserByUsername(Username);
            
            return Ok(user);
        }
        
    }
}
