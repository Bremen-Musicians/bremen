package com.bremen.backend.domain.article.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleRequest {
	@NotNull(message = "게시글의 제목은 비어있을 수 없습니다.")
	private String title;

	@NotNull(message = "게시글의 내용은 비어있을 수 없습니다.")
	private String content;

	private Long videoId;
}
