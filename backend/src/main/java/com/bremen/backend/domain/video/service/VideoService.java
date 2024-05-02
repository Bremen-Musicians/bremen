package com.bremen.backend.domain.video.service;

import com.bremen.backend.domain.video.dto.VideoRequest;
import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Video;

public interface VideoService {
	VideoResponse findVideoById(Long videoId);

	Video getVideoById(Long videoId);

	VideoResponse addVideo(VideoRequest videoRequest);
}
