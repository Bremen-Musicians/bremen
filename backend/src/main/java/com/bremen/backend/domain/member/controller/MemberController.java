package com.bremen.backend.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
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

	@GetMapping()
	ResponseEntity<CustomResponse<MemberResponse>> memberDetails(@RequestParam("id") Long id) {
		MemberResponse memberResponse = memberService.findMemberById(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "조회 성공", memberResponse));
	}

	@PostMapping()
	ResponseEntity<CustomResponse<MemberResponse>> memberAdd(@RequestBody MemberRequest memberRequest) {
		MemberResponse memberResponse = memberService.addMember(memberRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 추가되었습니다", memberResponse));
	}

	@PatchMapping()
	ResponseEntity<CustomResponse<MemberResponse>> memberModify(@RequestBody MemberUpdateRequest memberUpdateRequest) {
		MemberResponse memberResponse = memberService.modifyMember(memberUpdateRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 수정되었습니다", memberResponse));
	}

	@DeleteMapping()
	ResponseEntity<CustomResponse<Long>> memberRemove(@RequestParam("id") Long id) {
		Long memberId = memberService.removeMember(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 삭제되었습니다", memberId));
	}
}
