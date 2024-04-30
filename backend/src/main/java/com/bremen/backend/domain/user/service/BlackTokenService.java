package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.entity.BlackToken;

public interface BlackTokenService {
	void saveToken(BlackToken blackToken);

	void findByToken(String accessToken);
}
