package com.bremen.backend.domain.video.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bremen.backend.domain.video.entity.Instrument;
import com.bremen.backend.domain.video.entity.Music;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VideoResponse {
	private Long id;
	private String videoUrl;
	private String imageUrl;
	private boolean isHighlight;
	private boolean isEnsemble;
	private LocalDateTime createTime;
	private Music music;
	private Instrument instrument;
	private List<VideoResponse> ensembleVideo;
}
