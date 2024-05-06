package com.bremen.backend.domain.article.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.dto.CommentRequest;
import com.bremen.backend.domain.article.dto.CommentResponse;
import com.bremen.backend.domain.article.dto.CommentUpdateRequest;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.Comment;
import com.bremen.backend.domain.article.mapper.CommentMapper;
import com.bremen.backend.domain.article.repository.CommentRepository;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.service.UserService;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	private static final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);
	private final CommentRepository commentRepository;
	private final UserService userService;
	private final ArticleService articleService;

	@Override
	public Comment getCommentById(Long commentId) {
		return commentRepository.findById(commentId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));
	}

	@Override
	@Transactional
	public CommentResponse addComment(CommentRequest commentRequest) {
		Comment comment = CommentMapper.INSTANCE.commentRequestToComment(commentRequest);
		User user = userService.getUserByToken();
		Article article = articleService.getArticleById(commentRequest.getArticleId());
		if (commentRequest.getGroupId() != null) {
			comment.saveComment(user, article, getCommentById(commentRequest.getGroupId()));
		} else {
			comment.saveComment(user, article, null);
		}
		return CommentMapper.INSTANCE.commentToCommentResponse(commentRepository.save(comment));
	}

	@Override
	@Transactional
	public CommentResponse modifyComment(CommentUpdateRequest commentRequest) {
		Comment comment = getCommentById(commentRequest.getId());
		if (!comment.getUser().equals(userService.getUserByToken())) {
			throw new CustomException(ErrorCode.UNAUTHORIZED_COMMENT_ACCESS);
		}
		comment.modifyContent(commentRequest.getContent());
		return CommentMapper.INSTANCE.commentToCommentResponse(comment);
	}
}
