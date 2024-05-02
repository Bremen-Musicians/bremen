package com.bremen.backend.domain.video.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Video;
import com.bremen.backend.domain.video.mapper.VideoMapper;
import com.bremen.backend.domain.video.repository.VideoRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
	private final VideoRepository videoRepository;

	@Override
	public VideoResponse findVideoById(Long videoId) {
		return VideoMapper.INSTANCE.videoToVideoResponse(getVideoById(videoId));
	}

	@Override
	public Video getVideoById(Long videoId) {
		return videoRepository.findById(videoId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_VIDEO));
	}
}
