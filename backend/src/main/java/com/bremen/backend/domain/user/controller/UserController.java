package com.bremen.backend.domain.user.controller;

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

import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.service.UserService;
import com.bremen.backend.global.response.CustomResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

	private final UserService userService;

	@GetMapping()
	ResponseEntity<CustomResponse<UserResponse>> memberDetails(@RequestParam("id") Long id) {
		UserResponse userResponse = userService.findUserById(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "조회 성공", userResponse));
	}

	@PostMapping()
	ResponseEntity<CustomResponse<UserResponse>> memberAdd(@RequestBody UserRequest userRequest) {
		UserResponse userResponse = userService.addUser(userRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 추가되었습니다", userResponse));
	}

	@PatchMapping()
	ResponseEntity<CustomResponse<UserResponse>> memberModify(@RequestBody UserUpdateRequest userUpdateRequest) {
		UserResponse userResponse = userService.modifyUser(userUpdateRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 수정되었습니다", userResponse));
	}

	@DeleteMapping()
	ResponseEntity<CustomResponse<Long>> memberRemove(@RequestParam("id") Long id) {
		Long memberId = userService.removeUser(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 삭제되었습니다", memberId));
	}
}
