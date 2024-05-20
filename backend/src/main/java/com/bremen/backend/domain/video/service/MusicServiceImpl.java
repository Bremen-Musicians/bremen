package com.bremen.backend.domain.video.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bremen.backend.domain.video.dto.MusicResponse;
import com.bremen.backend.domain.video.entity.Music;
import com.bremen.backend.domain.video.mapper.MusicMapper;
import com.bremen.backend.domain.video.repository.MusicRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;
import com.bremen.backend.global.response.ListResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {
	private final MusicRepository musicRepository;

	@Override
	public Music getMusicById(Long musicId) {
		return musicRepository.findById(musicId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MUSIC));
	}

	@Override
	public ListResponse searchMusicsByTitle(String title, Pageable pageable) {
		Page<Music> pages = musicRepository.findByTitleContaining(title, pageable);
		List<MusicResponse> musics = pages.getContent()
			.stream()
			.map(MusicMapper.INSTANCE::musicToMusicResponse)
			.collect(Collectors.toList());
		return new ListResponse(musics, pages.getTotalElements(), pages.getPageable());
	}
}