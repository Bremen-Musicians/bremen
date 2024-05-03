package com.bremen.backend.domain.video.dto;

import java.time.LocalDateTime;

import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.video.entity.Instrument;
import com.bremen.backend.domain.video.entity.Music;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VideoResponse {
	private String videoUrl;
	private String imageUrl;
	private boolean isHighlight;
	private boolean isEnsemble;
	private LocalDateTime createTime;
	private User user;
	private Music music;
	private Instrument instrument;
}
