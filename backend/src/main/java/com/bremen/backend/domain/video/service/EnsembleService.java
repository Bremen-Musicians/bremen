package com.bremen.backend.domain.video.service;

import java.util.List;

import com.bremen.backend.domain.video.entity.Video;

public interface EnsembleService {
	void addEnsemble(Video owner, Video participant);

	//소유자의 동영상을 참조한 모든 동영상을 가져옵니다
	List<Video> getRelatedVideoList(Video owner);

	List<Video> getEnsembleVideoList(Video owner);
}
