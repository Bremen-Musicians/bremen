package com.bremen.backend.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.service.MemberService;
import com.bremen.backend.global.response.CustomResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@Slf4j
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/{id}")
	ResponseEntity<CustomResponse<MemberResponse>> memberDetails(@PathVariable("id") Long id) {
		MemberResponse memberResponse = memberService.findMember(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "조회 성공", memberResponse));
	}

	@PostMapping()
	ResponseEntity<CustomResponse<MemberResponse>> memberAdd(@RequestBody MemberRequest memberRequest) {
		MemberResponse memberResponse = memberService.addMember(memberRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 추가되었습니다", memberResponse));
	}

}
