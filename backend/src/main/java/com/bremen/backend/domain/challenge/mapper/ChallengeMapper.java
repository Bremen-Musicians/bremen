package com.bremen.backend.domain.challenge.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.challenge.dto.ChallengeRequest;
import com.bremen.backend.domain.challenge.dto.ChallengeResponse;
import com.bremen.backend.domain.challenge.entity.Challenge;

@Mapper
public interface ChallengeMapper {
	ChallengeMapper INSTANCE = Mappers.getMapper(ChallengeMapper.class);

	@Mapping(target = "musicTitle", source = "challenge.music.title")
	ChallengeResponse challengeToChallengeResponse(Challenge challenge);

	@Mapping(target = "music.id", source = "challengeRequest.musicId")
	Challenge challengeRequestToChallenge(ChallengeRequest challengeRequest);

	@Mapping(target = "musicId", source = "challenge.music.id")
	ChallengeRequest challengeToChallengeRequest(Challenge challenge);
}
