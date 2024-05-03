package com.bremen.backend.domain.article.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleRequest {
	private String title;
	private String content;
	private Long videoId;
}
