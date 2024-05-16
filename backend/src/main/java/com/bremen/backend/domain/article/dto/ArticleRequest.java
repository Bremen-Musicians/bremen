package com.bremen.backend.domain.article.dto;

import java.util.Set;

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

	@NotNull(message = "챌린지 참여 여부는 비어있을 수 없습니다.")
	private boolean isChallenge;

	private Long videoId;

	private Set<String> hashtags;
}
