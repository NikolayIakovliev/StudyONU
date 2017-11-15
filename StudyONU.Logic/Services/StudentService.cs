using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.Infrastructure;
using StudyONU.Core.Entities;

namespace StudyONU.Logic.Services
{
    public class StudentService : ServiceBase, IStudentService
    {
        public StudentService(
            IUnitOfWork unitOfWork, 
            IMapper mapper, 
            ILogger logger
            ) : base(unitOfWork, mapper, logger) { }
    }
}
