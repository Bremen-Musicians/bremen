package com.bremen.backend.domain.video.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.video.entity.Ensemble;
import com.bremen.backend.domain.video.entity.Video;
import com.bremen.backend.domain.video.repository.EnsembleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnsembleServiceImpl implements EnsembleService {
	private final EnsembleRepository ensembleRepository;

	@Override
	public void addEnsemble(Video owner, Video participant) {
		Ensemble ensemble = Ensemble.builder()
			.owner(owner)
			.participant(participant)
			.build();
		ensembleRepository.save(ensemble);
	}

	//소유자의 동영상을 참조한 모든 동영상을 가져옵니다
	@Override
	public List<Video> getRelatedVideoList(Video owner) {
		List<Video> videoList = new ArrayList<>();
		List<Ensemble> ownerList = ensembleRepository.findByOwner(owner.getId()); // 나를 참조한 동영상 리스트

		for (Ensemble ensemble : ownerList) {
			videoList.add(ensemble.getParticipant());
		}

		return videoList;
	}

	@Override
	public List<Video> getEnsembleVideoList(Video owner) {
		return ensembleRepository.findByOwnerVideo(owner)
			.stream()
			.map(Ensemble::getParticipant)
			.collect(Collectors.toList());
	}

}
