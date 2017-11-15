using System;

namespace StudyONU.Logic.Contracts
{
    public interface ILogger
    {
        void Log(string message);

        void Fatal(string message);

        void Fatal(Exception exception);
    }
}
