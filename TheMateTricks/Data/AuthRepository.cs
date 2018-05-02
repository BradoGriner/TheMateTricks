using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using TheMateTricks.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using TheMateTricks.DTOs;

namespace TheMateTricks.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AuthRepository(DataContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<User> Login(string userName, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            return (user == null || !PasswordHashVerified(password, user.PasswordHash, user.PasswordSalt)) ? null : user;
        }

        private bool PasswordHashVerified(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            // Hash password and compare with PasswordHash stored in database

            //Creates hashing object
            var hash = new HMACSHA512();

            //Set the key to the password salt
            hash.Key = passwordSalt;

            //Compute the hash with the given salt
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            // Return true if the given password matches and false if it does not
            return computedHash.SequenceEqual(passwordHash);
        }

        public async Task<User> Register(RegisterUserDTO user)
        {
            // Hash the password using SHA512 with random key (salt)
            var hash = new HMACSHA512();
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(user.Password));

            var use = Mapper.Map<User>(user);
            use.PasswordHash = computedHash;
            use.PasswordSalt = hash.Key;

            await _context.Users.AddAsync(use);
            await _context.SaveChangesAsync();
            return use;
        }

        public bool ValidateUserName(string userName)
        {
            var matches = _context.Users.Where(b => b.UserName == userName).SingleOrDefault();
            if (matches == null)
            {
                return false;

            }
            else
            {
                return true;
            }
        }
    }
}
