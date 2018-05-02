using TheMateTricks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheMateTricks.DTOs;


namespace TheMateTricks.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(RegisterUserDTO user);
        Task<User> Login(string userName, string password);

        bool ValidateUserName(string userName);
    }
}