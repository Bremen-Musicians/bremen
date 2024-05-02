package com.bremen.backend.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserReissueResponse {
	private String refreshToken;
	private String accessToken;
}
