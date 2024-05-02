package com.bremen.backend.domain.user.dto;

import lombok.Data;

@Data
public class UserProfileUpdateResponse {
	private String profileImage;
	private String nickname;
	private String introduce;
}
