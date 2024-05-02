package com.bremen.backend.domain.user.dto;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
	private String nickname;
	private String introduce;
}
