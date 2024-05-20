package com.bremen.backend.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginResponse {
	private Long id;
	private String username;
	private String profileImage;
	private String nickname;
	private String refreshToken;
	private String accessToken;
}
