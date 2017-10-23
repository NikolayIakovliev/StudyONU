using System.Collections.Generic;

namespace StudyONU.Logic.Infrastructure
{
    public static class Roles
    {
        public static string Admin = "Админ";

        public static string Lecturer = "Преподаватель";

        public static string Student = "Студент";

        public static IEnumerable<string> GetRoles() => new List<string>
        {
            Admin,
            Lecturer,
            Student
        };
    }
}
