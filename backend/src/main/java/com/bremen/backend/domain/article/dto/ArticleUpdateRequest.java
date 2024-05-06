package com.bremen.backend.domain.article.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleUpdateRequest {
	@NotNull(message = "삭제하려는 게시물의 아이디는 비어있을 수 없습니다.")
	private Long id;

	private String title;

	private String content;
}
