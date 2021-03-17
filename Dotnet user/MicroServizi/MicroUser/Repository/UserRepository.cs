﻿using Microsoft.EntityFrameworkCore;
using MicroUser.DBContexts;
using MicroUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroUser.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _dbContext;

        public UserRepository(UserContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DeleteUser(int UserId)
        {
            var user = _dbContext.User.Find(UserId);
            var login = _dbContext.Login.Find(UserId);
            _dbContext.User.Remove(user);
            _dbContext.Login.Remove(login);
            Save();
        }

        public async Task<User> GetUserByID(int UserId)
        {
            return await _dbContext.User.FindAsync(UserId);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _dbContext.User.ToListAsync();
        }

        public void InsertUser(User User)
        {
            Login login = new Login();
            _dbContext.Add(User); Save();
            login.Username = User.Username;
            login.Password = User.Password;
            _dbContext.Add(login); Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void UpdateUser(User User)
        {
            _dbContext.Entry(User).State = EntityState.Modified; Save();
            Login login = new Login();
            login.Username = User.Username;
            login.Password = User.Password;
            _dbContext.Entry(login).State = EntityState.Modified; Save();
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _dbContext.User.Where(e => e.Username.Contains(username)).FirstOrDefaultAsync(); }
    }
}