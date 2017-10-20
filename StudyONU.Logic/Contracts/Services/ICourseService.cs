﻿using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ICourseService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(CourseCreateDTO courseCreateDTO);

        Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetByLecturerEmailAsync(string email);
    }
}