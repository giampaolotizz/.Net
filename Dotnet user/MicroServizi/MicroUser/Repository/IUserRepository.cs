using MicroUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroUser.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();

        User GetUserByID(int UserId);

        void InsertUser(User User);

        void DeleteUser(int UserId);

        void UpdateUser(User User);

        User GetUserByUsername(String username);

        void Save();
    }
}
