using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using TheMateTricks.Models;
using Microsoft.EntityFrameworkCore;
using TheMateTricks.Data.MateTricks.Data;

namespace TheMateTricks.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
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

        public async Task<User> Register(string userName, string password)
        {
            // Hash the password using SHA512 with random key (salt)
            var hash = new HMACSHA512();
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            var newUser = new User { UserName = userName };
            newUser.PasswordHash = computedHash;
            newUser.PasswordSalt = hash.Key;

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return newUser;
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
