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

import com.bremen.backend.domain.user.dto.UserLoginRequest;
import com.bremen.backend.domain.user.dto.UserLoginResponse;
import com.bremen.backend.domain.user.dto.UserProfileRequest;
import com.bremen.backend.domain.user.dto.UserRegistrationRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.service.AuthService;
import com.bremen.backend.domain.user.service.ProfileService;
import com.bremen.backend.domain.user.service.RegistrationService;
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
	private final RegistrationService registrationService;
	private final ProfileService profileService;
	private final AuthService authService;

	@GetMapping()
	ResponseEntity<CustomResponse<UserResponse>> userDetails(@RequestParam("id") Long id) {
		UserResponse userResponse = userService.findUserById(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "조회 성공", userResponse));
	}

	@PostMapping()
	ResponseEntity<CustomResponse<UserResponse>> userAdd(@RequestBody UserRegistrationRequest userRegistrationRequest) {
		UserResponse userResponse = registrationService.register(userRegistrationRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 추가되었습니다", userResponse));
	}

	@PostMapping("/profile")
	ResponseEntity<CustomResponse<Void>> userProfileAdd(@RequestBody UserProfileRequest userProfileRequest) {
		profileService.modifyUserProfile(userProfileRequest);
		CustomResponse<Void> response = new CustomResponse<>(HttpStatus.OK.value(), "회원가입이 성공적으로 완료되었습니다.", null);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PatchMapping()
	ResponseEntity<CustomResponse<UserResponse>> userModify(@RequestBody UserUpdateRequest userUpdateRequest) {
		UserResponse userResponse = userService.modifyUser(userUpdateRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 수정되었습니다", userResponse));
	}

	@DeleteMapping()
	ResponseEntity<CustomResponse<Long>> userRemove(@RequestParam("id") Long id) {
		Long memberId = userService.removeUser(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "유저가 성공적으로 삭제되었습니다", memberId));
	}

	@GetMapping("/check-username")
	public ResponseEntity<CustomResponse<String>> duplicateCheckEmail(
		@RequestParam(value = "username") String username) {
		if (username != null) {
			userService.duplicateUsername(username);
			return ResponseEntity.ok(new CustomResponse(HttpStatus.OK.value(), "이메일 중복체크 성공", ""));
		} else {
			return ResponseEntity.ok(new CustomResponse(HttpStatus.BAD_REQUEST.value(), "이메일이 중복입니다", ""));
		}
	}

	@GetMapping("/check-nickname")
	public ResponseEntity<CustomResponse<String>> duplicateCheckNickname(
		@RequestParam(value = "nickname") String nickname) {
		if (nickname != null) {
			userService.duplicateNickname(nickname);
			return ResponseEntity.ok(new CustomResponse(HttpStatus.OK.value(), "닉네임 중복체크 성공", ""));
		} else {
			return ResponseEntity.ok(new CustomResponse(HttpStatus.BAD_REQUEST.value(), "닉네임이 중복입니다", ""));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<CustomResponse<UserLoginResponse>> login(@RequestBody UserLoginRequest userLoginRequest) {
		UserLoginResponse userLoginResponse = authService.login(userLoginRequest);
		return ResponseEntity.ok(new CustomResponse(HttpStatus.OK.value(), "로그인 성공", userLoginResponse));
	}

	// @GetMapping("/logout")
	// public CustomResponse<String> logout(@RequestHeader("Authorization") String accessToken,
	// 	@RequestHeader("Refresh-Token") String refreshToken) {
	// 	authService.logout(accessToken, refreshToken);
	// 	return new CustomResponse<>(HttpStatus.OK.value(), "logout 성공!", "");
	// }
}
