package com.bremen.backend.domain.challenge.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChallengeArticleResponse {
	private String musicTitle;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private Long articleId;
}
