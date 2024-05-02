package com.bremen.backend.domain.video.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VideoRequest {
	@NotNull(message = "영상의 링크는 비어있을 수 없습니다.")
	private String videoUrl;

	@NotNull(message = "썸네일의 링크는 비어있을 수 없습니다.")
	private String imageUrl;

	private int startTime;

	@NotNull(message = "하이라이트 영상 여부는 선택해주셔야 합니다.")
	private boolean isHighlight;

	@NotNull(message = "합주 여부는 선택해주셔야 합니다.")
	private boolean isEnsemble;

	private Long articleId;

	private Long userId;

	private Long musicId;

	private Long instrumentId;
}
