package com.bremen.backend.domain.video.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.service.UserService;
import com.bremen.backend.domain.video.dto.VideoRequest;
import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Video;
import com.bremen.backend.domain.video.mapper.VideoMapper;
import com.bremen.backend.domain.video.repository.VideoRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.infra.s3.service.S3Service;
import com.bremen.backend.global.response.ErrorCode;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
	private final VideoRepository videoRepository;
	private final UserService userService;
	private final S3Service s3Service;

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
	public VideoResponse addVideo(VideoRequest videoRequest, MultipartFile thumbnailFile, MultipartFile videoFile,
		MultipartFile highlightFile) throws
		IOException {
		Video video = VideoMapper.INSTANCE.videoRequestToVideo(videoRequest);
		String imageUrl = "";
		String videoUrl = "";

		// 작성자
		User user = userService.getUserByToken();
		video.setWriter(user);

		// 썸네일
		imageUrl = s3Service.streamUpload("thumbnail", thumbnailFile);
		video.setImage(imageUrl);

		// 영상
		if (highlightFile != null && !highlightFile.isEmpty()) {
			videoUrl = s3Service.streamUpload("video", highlightFile);
			video.setVideo(videoUrl);
			videoRepository.save(video);
		}
		videoUrl = s3Service.streamUpload("video", videoFile);
		video.setVideo(videoUrl);

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
