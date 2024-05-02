package com.bremen.backend.domain.video.dto;

import com.bremen.backend.domain.user.entity.User;
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
	private int startTime;
	private User user;
	private Music music;
	private Instrument instrument;
}
