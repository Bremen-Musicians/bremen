package com.bremen.backend.domain.article.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentRequest {
	private Long groupId;

	@NotNull(message = "댓글의 내용은 비어있을 수 없습니다.")
	private String content;

	@NotNull(message = "게시글의 id는 비어있을 수 없습니다.")
	private Long articleId;
}
