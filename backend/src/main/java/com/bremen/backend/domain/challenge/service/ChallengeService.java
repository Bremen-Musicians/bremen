package com.bremen.backend.domain.challenge.service;

import com.bremen.backend.domain.challenge.dto.ChallengeRequest;
import com.bremen.backend.domain.challenge.dto.ChallengeResponse;

public interface ChallengeService {
	ChallengeResponse addChallenge(ChallengeRequest challengeRequest);
}
