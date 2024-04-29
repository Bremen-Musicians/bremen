package com.bremen.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.entity.Token;
import com.bremen.backend.domain.user.repository.TokenRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenServiceImpl implements TokenService {
	private final TokenRepository tokenRepository;

	@Override
	@Transactional
	public void saveTokenInfo(String username, String refreshToken, String accessToken) {
		tokenRepository.save(
			Token.builder()
				.username(username)
				.refreshToken(refreshToken)
				.accessToken(accessToken)
				.build()
		);
	}

	@Override
	public Token findById(Long userId) {
		return tokenRepository.findById(String.valueOf(userId)).orElseThrow(
			() -> new CustomException(ErrorCode.NOT_FOUND_ACCESS_TOKEN)
		);
	}
	// 토큰 저장

	@Override
	public Token findByRefreshToken(String refreshToken) {
		return tokenRepository.findByRefreshToken(refreshToken)
			.orElseThrow(
				() -> new CustomException(ErrorCode.NOT_FOUND_REFRESH_TOKEN)
			);
	}
	// 리프레시 토큰을 기준으로 토큰을 찾습니다

	@Override
	public void deleteByRefreshToken(String refreshToken) {
		tokenRepository.findByRefreshToken(refreshToken)
			.ifPresent(
				token -> tokenRepository.delete(token)
			);
	}

	@Override
	public Token findByRefreshTokenAndDelete(String refreshToken) {
		Token token = findByRefreshToken(refreshToken);
		deleteByRefreshToken(refreshToken);
		return token;
	}

	@Override
	public void deleteById(Long userId) {
		findById(userId); // 토큰이 없을 경우 토큰을 찾을때 throw
		tokenRepository.deleteById(String.valueOf(userId));
	}
}
