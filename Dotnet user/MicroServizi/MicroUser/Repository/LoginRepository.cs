using Microsoft.EntityFrameworkCore;
using MicroUser.DBContexts;
using MicroUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroUser.Repository
{
    public class LoginRepository : ILoginRepository
    {

        private readonly UserContext _dbContext;

        public LoginRepository(UserContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DeleteLogin(int LoginId)
        {
            var login = _dbContext.Login.Find(LoginId);
            _dbContext.Login.Remove(login);
            Save();
        }

        public async Task<Login> GetLoginByID(int LoginId)
        {
            return await _dbContext.Login.FindAsync(LoginId);
        }

        public async Task<IEnumerable<Login>> GetLogins()
        {
            return await _dbContext.Login.ToListAsync();
        }

        public void InsertLogin(Login login)
        {
            _dbContext.Add(login); Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void UpdateLogin(Login login)
        {
            _dbContext.Entry(login).State = EntityState.Modified; Save();
        }
    }
}
