package com.bremen.backend.domain.video.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MusicResponse {
	private Long id;
	private String title;
	private String composer;
	private String singer;
}
