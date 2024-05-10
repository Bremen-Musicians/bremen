package com.bremen.backend.domain.article.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentUpdateRequest {
	@NotNull(message = "수정하려는 댓글의 아이디는 비어있을 수 없습니다.")
	private Long id;

	@NotNull(message = "수정하려는 댓글의 내용은 비어있을 수 없습니다.")
	private String content;
}
