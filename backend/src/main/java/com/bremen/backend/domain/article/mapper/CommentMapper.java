package com.bremen.backend.domain.article.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.article.dto.CommentRelationResponse;
import com.bremen.backend.domain.article.dto.CommentRequest;
import com.bremen.backend.domain.article.dto.CommentResponse;
import com.bremen.backend.domain.article.entity.Comment;

@Mapper
public interface CommentMapper {
	CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

	@Mapping(target = "groupId", source = "comment.group.id")
	@Mapping(target = "writerNickname", source = "comment.user.nickname")
	CommentResponse commentToCommentResponse(Comment comment);

	@Mapping(target = "group.id", source = "commentRequest.groupId")
	@Mapping(target = "article.id", source = "commentRequest.articleId")
	Comment commentRequestToComment(CommentRequest commentRequest);

	@Mapping(target = "profile", source = "comment.user.profileImage")
	@Mapping(target = "writerNickname", source = "comment.user.nickname")
	CommentRelationResponse commentToCommentRelationResponse(Comment comment);
}
