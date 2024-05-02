package com.bremen.backend.domain.video.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.video.dto.VideoRequest;
import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Instrument;
import com.bremen.backend.domain.video.entity.Music;
import com.bremen.backend.domain.video.entity.Video;
import com.bremen.backend.domain.video.mapper.VideoMapper;
import com.bremen.backend.domain.video.repository.VideoRepository;

import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
public class VideoServiceTest {
	@InjectMocks
	private VideoServiceImpl videoService;

	@Mock
	private VideoRepository videoRepository;

	static private Video video;
	static private User user;
	static private Instrument instrument;
	static private Music music;

	// Setting - 음악, 악기, 회원, 영상, 게시글
	@BeforeAll
	public static void setUpBeforeClass() throws Exception {
		long id = 1L;
		String title = "test title";
		String url = "url";

		// 음악
		String composer = "test composer";
		music = Music.builder()
			.id(id)
			.title(title)
			.composer(composer)
			.build();

		// 악기
		String name = "cello";
		instrument = Instrument.builder()
			.id(id)
			.name(name)
			.build();

		// 회원
		String username = "test@email.com";
		String password = "test";
		String intro = "hello?";
		String nickname = "test";
		String profile = "image";

		user = User.builder()
			.id(id)
			.username(username)
			.password(password)
			.introduce(intro)
			.nickname(nickname)
			.profileImage(profile)
			.build();

		// 영상
		video = Video.builder()
			.id(id)
			.videoUrl(url)
			.imageUrl(url)
			.user(user)
			.music(music)
			.instrument(instrument)
			.build();

	}

	// Find
	@Test
	void findVideo() {
		// given
		long videoId = 1L;
		when(videoRepository.findById(videoId)).thenReturn(Optional.of(video));

		// when
		VideoResponse videoResponse = videoService.findVideoById(videoId);

		// then
		assertThat(videoResponse).isNotNull();
	}

	// Add
	@Test
	void addVideo() {
		// given
		VideoRequest videoRequest = VideoMapper.INSTANCE.videoToVideoRequest(video);

		// when
		when(videoRepository.save(any(Video.class))).thenReturn(video);
		VideoResponse videoResponse = videoService.addVideo(videoRequest);

		//then
		assertThat(videoResponse.getVideoUrl()).isEqualTo(videoRequest.getVideoUrl());
		verify(videoRepository, times(1)).save(any(Video.class));
	}

	@Test
	void removeVideo() {
		// given
		when(videoRepository.findById(video.getId())).thenReturn(Optional.of(video));

		// when
		Long removedId = videoService.removeVideo(video.getId());

		//then
		assertThat(removedId).isEqualTo(video.getId());
	}
}
