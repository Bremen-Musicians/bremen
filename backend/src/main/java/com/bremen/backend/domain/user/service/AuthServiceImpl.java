package com.bremen.backend.domain.user.service;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bremen.backend.domain.user.dto.UserLoginRequest;
import com.bremen.backend.domain.user.dto.UserLoginResponse;
import com.bremen.backend.domain.user.entity.BlackToken;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.global.common.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final BlackTokenService blackTokenService;
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenUtil jwtTokenUtil;
	private final TokenService tokenService;

	@Override
	public UserLoginResponse login(UserLoginRequest userLoginRequest) {
		User user = userService.getUserByUsername(userLoginRequest.getUsername());
		// 해당하는 유저가 있는지 먼저 확인한다

		passwordEncoder.matches(user.getPassword(), user.getPassword());
		// 패스워드가 일치하는지 확인한다

		String accessToken = jwtTokenUtil.createToken(user);
		String refreshToken = jwtTokenUtil.createRefreshToken();
		// 토큰 추가

		tokenService.saveTokenInfo(user.getUsername(), refreshToken, accessToken);
		// 토큰에 등록한다

		UserLoginResponse userLoginResponse = UserLoginResponse.builder()
			.id(user.getId())
			.username(user.getUsername())
			.nickname(user.getNickname())
			.profileImage(user.getProfileImage())
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();

		return userLoginResponse;
	}

	@Override
	public void logout(String accessToken, String refreshToken) {

		String extractedAccessToken = jwtTokenUtil.extractToken(accessToken);
		String extractedRefreshToken = jwtTokenUtil.extractToken(refreshToken);

		jwtTokenUtil.validateToken(extractedAccessToken);
		jwtTokenUtil.validateToken(extractedRefreshToken);

		tokenService.findByRefreshToken(extractedRefreshToken);
		// 해당 유저의 토큰이 존재하는지 확인 후 삭제

		Date expiredTime = jwtTokenUtil.extractTime(extractedAccessToken);
		Long timeToLive = expiredTime.getTime() - System.currentTimeMillis();
		// 만료기간 설정

		BlackToken blackToken = BlackToken.builder()
			.accessToken(extractedAccessToken)
			.value("logout")
			.timeToLive(timeToLive)
			.build();

		blackTokenService.saveToken(blackToken);
		// 블랙 토큰 생성

	}
}
