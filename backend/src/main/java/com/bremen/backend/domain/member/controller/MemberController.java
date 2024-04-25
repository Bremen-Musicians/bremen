package com.bremen.backend.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.service.MemberService;
import com.bremen.backend.global.response.CustomResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/{id}")
	ResponseEntity<CustomResponse<MemberResponse>> findMember(@PathVariable("id") Long id) {
		MemberResponse memberResponse = memberService.findMember(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "조회 성공", memberResponse));
	}
}
