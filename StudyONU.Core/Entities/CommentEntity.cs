﻿using System;

namespace StudyONU.Core.Entities
{
    public class CommentEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int SenderId { get; set; }

        public virtual UserEntity Sender { get; set; }

        public int StudentId { get; set; }

        public virtual StudentEntity Student { get; set; }

        public int TaskId { get; set; }

        public virtual TaskEntity Task { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
