package com.bremen.backend.domain.challenge.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.challenge.dto.ChallengeRequest;
import com.bremen.backend.domain.challenge.dto.ChallengeResponse;
import com.bremen.backend.domain.challenge.entity.Challenge;
import com.bremen.backend.domain.challenge.mapper.ChallengeMapper;
import com.bremen.backend.domain.challenge.repository.ChallengeRepository;
import com.bremen.backend.domain.video.service.MusicService;
import com.bremen.backend.global.infra.s3.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
	private final ChallengeRepository challengeRepository;
	private final MusicService musicService;
	private final S3Service s3Service;

	@Override
	@Transactional
	public ChallengeResponse addChallenge(ChallengeRequest challengeRequest, MultipartFile mainImage,
		MultipartFile challengeImage) throws IOException {
		Challenge challenge = ChallengeMapper.INSTANCE.challengeRequestToChallenge(challengeRequest);
		String mainImageUrl = "";
		String challengeImageUrl = "";
		mainImageUrl = s3Service.streamUpload("challenge", mainImage);
		challengeImageUrl = s3Service.streamUpload("challenge", challengeImage);
		challenge.saveChallenge(musicService.getMusicById(challenge.getMusic().getId()), mainImageUrl,
			challengeImageUrl);
		return ChallengeMapper.INSTANCE.challengeToChallengeResponse(challengeRepository.save(challenge));
	}
}
