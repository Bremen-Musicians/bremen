package com.bremen.backend.domain.challenge.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ChallengeRequest {
	@NotNull(message = "챌린지 곡은 선택해주셔야 합니다.")
	private Long musicId;

	@NotNull(message = "시작일은 선택해주셔야 합니다.")
	private LocalDateTime startTime;

	@NotNull(message = "종료일은 선택해주셔야 합니다.")
	private LocalDateTime endTime;
}
