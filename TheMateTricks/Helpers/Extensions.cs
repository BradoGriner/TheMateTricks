using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMateTricks.Helpers
{
    public static class Extensions
    {
        public static int CalculateAge(this DateTime birthdate)
        {
            int age = DateTime.Today.Year - birthdate.Year;
            DateTime userbirthday = new DateTime(DateTime.Today.Year, birthdate.Month, birthdate.Day);
            if (DateTime.Today.CompareTo(userbirthday) < 0)
            {
                age -= 1;
            }
            return age;
        }
    }
}