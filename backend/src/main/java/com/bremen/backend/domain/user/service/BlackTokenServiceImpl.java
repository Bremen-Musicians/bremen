package com.bremen.backend.domain.user.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.user.entity.BlackToken;
import com.bremen.backend.domain.user.repository.BlackTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlackTokenServiceImpl implements BlackTokenService {
	private final BlackTokenRepository blackTokenRepository;

	@Override
	public void saveToken(BlackToken blackToken) {
		blackTokenRepository.save(blackToken);
	}

	@Override
	public void findByToken(String accessToken) {
		blackTokenRepository.findByAccessToken(accessToken).ifPresent(
			result -> {
				throw new RuntimeException("로그아웃 된 토큰입니다");
			});
	}
}
