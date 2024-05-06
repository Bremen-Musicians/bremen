package com.bremen.backend.domain.article.service;

import com.bremen.backend.domain.article.dto.CommentRequest;
import com.bremen.backend.domain.article.dto.CommentResponse;
import com.bremen.backend.domain.article.dto.CommentUpdateRequest;
import com.bremen.backend.domain.article.entity.Comment;

public interface CommentService {
	Comment getCommentById(Long commentId);

	CommentResponse addComment(CommentRequest commentRequest);

	CommentResponse modifyComment(CommentUpdateRequest commentRequest);
}
