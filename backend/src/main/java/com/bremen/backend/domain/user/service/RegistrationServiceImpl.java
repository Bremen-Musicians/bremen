package com.bremen.backend.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.dto.UserRegistrationRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public UserResponse register(UserRegistrationRequest userRegistrationRequest) {

		User user = UserMapper.INSTANCE.userRegistrationToUser(userRegistrationRequest);
		// 유저 정보를 입력받음

		userService.duplicateNickname(user.getNickname());
		userService.duplicateUsername(user.getUsername());
		//중복확인

		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.modifyPassword(encodedPassword);
		// 비밀번호 암호화

		user.agreeUser();
		//유저 동의

		UserResponse userResponse = UserMapper.INSTANCE.userToUserResponse(
			userService.addUser(user)
		);

		return userResponse;

	}
}
