package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.dto.UserReissueResponse;

public interface ReissueService {
	UserReissueResponse reissueAccessToken(String refreshToken);
}
