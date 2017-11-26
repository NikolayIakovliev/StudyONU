﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Comment;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Comment;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class CommentsController : ApiController
    {
        private readonly ICommentService service;
        private readonly IMapper mapper;

        public CommentsController(ICommentService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentCreateBindingModel model)
        {
            CommentCreateDTO comment = mapper.Map<CommentCreateDTO>(model);
            comment.SenderEmail = GetUserEmail();

            ServiceMessage serviceMessage = await service.CreateAsync(comment);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] int taskId, [FromQuery] string studentEmail)
        {
            DataServiceMessage<IEnumerable<CommentListDTO>> serviceMessage = await service.GetByTaskAndStudentAsync(taskId, studentEmail);

            return GenerateResponse(serviceMessage);
        }
    }
}
