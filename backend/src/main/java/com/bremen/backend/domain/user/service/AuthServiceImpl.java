package com.bremen.backend.domain.user.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bremen.backend.domain.user.dto.UserLoginRequest;
import com.bremen.backend.domain.user.dto.UserLoginResponse;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.global.common.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final UserService userService;
	private final UserDetailsService userDetailsService;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenUtil jwtTokenUtil;
	private final TokenService tokenService;

	@Override
	public UserLoginResponse login(UserLoginRequest userLoginRequest) {
		User user = (User)userDetailsService.loadUserByUsername(userLoginRequest.getUsername());
		// 해당하는 유저가 있는지 먼저 확인한다

		passwordEncoder.matches(user.getPassword(), user.getPassword());
		// 패스워드가 일치하는지 확인한다

		String accessToken = jwtTokenUtil.createToken(user);
		String refreshToken = jwtTokenUtil.createRefreshToken();
		// 토큰 추가

		tokenService.saveTokenInfo(user.getUsername(), refreshToken, accessToken);
		// 토큰에 등록한다

		UserLoginResponse userLoginResponse = UserLoginResponse.builder()
			.nickname(user.getNickname())
			.profileImage(user.getProfileImage())
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();

		return userLoginResponse;
	}
}
