package com.bremen.backend.domain.challenge.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.challenge.dto.ChallengeRequest;
import com.bremen.backend.domain.challenge.dto.ChallengeResponse;

public interface ChallengeService {
	ChallengeResponse addChallenge(ChallengeRequest challengeRequest, MultipartFile mainImage,
		MultipartFile challengeImage) throws
		IOException;
}
