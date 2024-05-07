package com.bremen.backend.domain.challenge.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.challenge.dto.ChallengeRequest;
import com.bremen.backend.domain.challenge.dto.ChallengeResponse;
import com.bremen.backend.domain.challenge.service.ChallengeService;
import com.bremen.backend.global.response.CustomResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/challenges")
@Tag(name = "Challenge", description = "챌린지 API")
public class ChallengeController {
	private final ChallengeService challengeService;

	@PostMapping
	@Operation(summary = "챌린지를 등록합니다.", description = "챌린지 곡, 일정, 챌린지 내용을 입력받아 챌린지를 등록합니다.")
	ResponseEntity<CustomResponse<ChallengeResponse>> challengeAdd(
		@RequestPart(value = "challengeInfo") ChallengeRequest challengeRequest,
		@RequestPart(value = "mainImage") MultipartFile mainImage,
		@RequestPart(value = "challengeImage") MultipartFile challengeImage) throws IOException {
		ChallengeResponse challengeResponse = challengeService.addChallenge(challengeRequest, mainImage,
			challengeImage);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "챌린지가 정상적으로 등록되었습니다.", challengeResponse));
	}
}
