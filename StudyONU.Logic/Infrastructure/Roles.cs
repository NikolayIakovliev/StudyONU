using System.Collections.Generic;

namespace StudyONU.Logic.Infrastructure
{
    public static class Roles
    {
        public static string Admin = "Admin";

        public static string Lecturer = "Lecturer";

        public static string Student = "Student";

        public static IEnumerable<string> GetRoles() => new List<string>
        {
            Admin,
            Lecturer,
            Student
        };
    }
}
