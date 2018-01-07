using System.Collections.Generic;

namespace StudyONU.Logic.Infrastructure
{
    public static class Roles
    {
        public static string Developer = "Developer";
        public static string DeveloperDisplayName = "Разработчик";

        public static string Admin = "Admin";
        public static string AdminDisplayName = "Админ";

        public static string HeadLecturer = "HeadLecturer";
        public static string HeadLecturerDisplayName = "Завкафедры";

        public static string Lecturer = "Lecturer";
        public static string LecturerDisplayName = "Преподаватель";

        public static string Student = "Student";
        public static string StudentDisplayName = "Студент";

        public static IDictionary<string, string> GetRoles() => new Dictionary<string, string>
        {
            { Developer, DeveloperDisplayName },
            { Admin, AdminDisplayName },
            { HeadLecturer, HeadLecturerDisplayName },
            { Lecturer, LecturerDisplayName },
            { Student, StudentDisplayName },
        };
    }
}
