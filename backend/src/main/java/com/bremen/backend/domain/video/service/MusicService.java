package com.bremen.backend.domain.video.service;

import org.springframework.data.domain.Pageable;

import com.bremen.backend.domain.video.entity.Music;
import com.bremen.backend.global.response.ListResponse;

public interface MusicService {
	Music getMusicById(Long musicId);

	ListResponse searchMusicsByTitle(String title, Pageable pageable);
}
