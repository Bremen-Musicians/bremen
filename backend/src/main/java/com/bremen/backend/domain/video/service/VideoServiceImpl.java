package com.bremen.backend.domain.video.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.video.dto.VideoRequest;
import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Video;
import com.bremen.backend.domain.video.mapper.VideoMapper;
import com.bremen.backend.domain.video.repository.VideoRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import jakarta.transaction.Transactional;
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

	@Override
	@Transactional
	public VideoResponse addVideo(VideoRequest videoRequest) {
		Video video = VideoMapper.INSTANCE.videoRequestToVideo(videoRequest);
		Video savedVideo = videoRepository.save(video);
		return VideoMapper.INSTANCE.videoToVideoResponse(savedVideo);
	}

	@Override
	@Transactional
	public Long removeVideo(Long videoId) {
		Video video = getVideoById(videoId);
		video.deleteVideo();
		return video.getId();
	}
}
