using System.IO;

namespace StudyONU.Admin.Insrastructure
{
    static class Paths
    {
        public static string LecturersImageUploadPath => $"{Path.DirectorySeparatorChar}images{Path.DirectorySeparatorChar}uploads{Path.DirectorySeparatorChar}lecturers";
        public static string StudentsImageUploadPath => $"{Path.DirectorySeparatorChar}images{Path.DirectorySeparatorChar}uploads{Path.DirectorySeparatorChar}students";

        public static string GuidesUploadPath => $"{Path.DirectorySeparatorChar}files{Path.DirectorySeparatorChar}uploads{Path.DirectorySeparatorChar}guides";
        public static string TasksUploadPath => $"{Path.DirectorySeparatorChar}files{Path.DirectorySeparatorChar}uploads{Path.DirectorySeparatorChar}tasks";
        public static string ReportsUploadPath => $"{Path.DirectorySeparatorChar}files{Path.DirectorySeparatorChar}uploads{Path.DirectorySeparatorChar}reports";
    }
}
