using MicroUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroUser.Repository
{
    interface ILoginRepository
    {
        Task<IEnumerable<Login>> GetLogins();

        Task<Login> GetLoginByID(int LoginId);

        void InsertLogin(Login login);

        void DeleteLogin(int LoginId);

        void UpdateLogin(Login login);

        void Save();
    }
}
