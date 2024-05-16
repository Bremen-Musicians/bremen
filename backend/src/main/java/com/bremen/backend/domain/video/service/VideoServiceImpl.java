package com.bremen.backend.domain.video.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
	private final EnsembleService ensembleService;
	private final MusicService musicService;
	private final InstrumentService instrumentService;

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

		video.setSavedVideo(userService.getUserByToken(),
			s3Service.streamUpload("thumbnail", thumbnailFile),
			musicService.getMusicById(videoRequest.getMusicId()),
			instrumentService.getInstrumentById(videoRequest.getInstrumentId()));

		String videoUrl = "";
		// 영상
		if (highlightFile != null && !highlightFile.isEmpty()) {
			videoUrl = s3Service.streamUpload("video", highlightFile);
			video.setSavedVideo(true, videoUrl);
			videoRepository.save(video);
		}
		videoUrl = s3Service.streamUpload("video", videoFile);
		video.setSavedVideo(false, videoUrl);

		Video savedVideo = videoRepository.save(video);

		//합주 영상일 경우
		if (videoRequest.isEnsemble()) {
			for (Long id : videoRequest.getEnsembleList()) {
				Video ensembleVideo = getVideoById(id);
				ensembleService.addEnsemble(savedVideo, ensembleVideo);
			}
		}
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
