package com.bremen.backend.domain.user.service;

import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.entity.Token;

public interface TokenService {
	@Transactional
	void saveTokenInfo(String username, String refreshToken, String accessToken);

	Token findById(Long userId);

	Token findByRefreshToken(String refreshToken);

	void deleteByRefreshToken(String refreshToken);

	Token findByRefreshTokenAndDelete(String refreshToken);

	void deleteById(Long userId);
}
