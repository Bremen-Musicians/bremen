package com.bremen.backend.domain.article.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleUpdateRequest {
	private Long id;
	private String title;
	private String content;
}
