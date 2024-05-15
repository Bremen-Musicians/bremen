package com.bremen.backend.domain.video.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VideoUrlResponse {
	private String videoUrl;
	private String imageUrl;
}
