package com.bremen.backend.domain.video.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.video.entity.Music;
import com.bremen.backend.domain.video.repository.MusicRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {
	private final MusicRepository musicRepository;

	@Override
	public Music getMusicById(Long musicId) {
		return musicRepository.findById(musicId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MUSIC));
	}
}
