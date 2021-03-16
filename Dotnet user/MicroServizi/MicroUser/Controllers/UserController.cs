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
        public ActionResult<IEnumerable<User>> Get()
        {
            var finalResults = _userRepository.GetUsers().ToList();
            return Ok(finalResults);

        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetUserByID(id);
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
        public IActionResult Put([FromBody] User user)
        {
            User u = _userRepository.GetUserByID(user.Id);

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
        [HttpGet("{login}", Name = "GetLogin")]
        public IActionResult getByUsername(String login)
        {
            var user = _userRepository.GetUserByUsername(login);
            return new OkObjectResult(user);
        }

    }
}
