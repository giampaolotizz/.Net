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

        public Login GetLoginByID(int LoginId)
        {
            return _dbContext.Login.Find(LoginId);
        }

        public IEnumerable<Login> GetLogins()
        {
            return _dbContext.Login.ToList();
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
