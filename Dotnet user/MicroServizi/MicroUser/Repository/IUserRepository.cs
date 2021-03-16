using MicroUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroUser.Repository
{
    public interface IUserRepository
    {
      Task<IEnumerable<User>> GetUsers();

        Task<User> GetUserByID(int UserId);

        void InsertUser(User User);

        void DeleteUser(int UserId);

        void UpdateUser(User User);

        Task<User> GetUserByUsername(String username);

        void Save();
    }
}
