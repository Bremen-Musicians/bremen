package com.bremen.backend.domain.video.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VideoRequest {
	@NotNull(message = "합주 여부는 선택해주셔야 합니다.")
	private boolean isEnsemble;

	private List<Long> ensembleList;

	private Long musicId;

	private Long instrumentId;
}
