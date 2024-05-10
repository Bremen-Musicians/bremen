package com.bremen.backend.domain.video.service;

import java.util.List;

import com.bremen.backend.domain.video.dto.MusicResponse;
import com.bremen.backend.domain.video.entity.Music;

public interface MusicService {
	Music getMusicById(Long musicId);

	List<MusicResponse> searchMusicsByTitle(String title);
}
