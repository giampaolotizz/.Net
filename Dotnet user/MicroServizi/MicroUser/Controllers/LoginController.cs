using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MicroUser.DBContexts;
using MicroUser.Models;

namespace MicroUser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private UserContext _context;
        public LoginController(IConfiguration config, UserContext context)
        {
            this._config = config;
            this._context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Login login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);

                response = Ok(new { token = tokenString });
            }

            return response;
        }

        //Genero il token
        private string GenerateJSONWebToken(Login userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //I claim sono dati contenuti nel token, che permettono l'autenticazione dell'utente
            //E abilitano l'autorizzazione all'accesso alle risorse. Possono essere
            //Qualsiasi campo che abbiamo inserito nell'user, come Username, email, ruolo o altre info
            /*
            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username), new Claim(JwtRegisteredClaimNames.Email, userInfo.USERTYPE),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            */
            var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Issuer"], null,/*claims*/
            expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //Autentico se l'user inserito dal login è effettivamente esistente 
        private Login AuthenticateUser([FromBody] Login login)
        {
            var userLogin = _context.Login.FirstOrDefault(u => u.Username.Equals(login.Username) && u.Password.Equals(login.Password));
            return userLogin;
        }
    }

}
