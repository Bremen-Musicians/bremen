package com.bremen.backend.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
	private String username;
	private String nickname;
	private String introduce;
	private String profileImage;
	private int followerCnt;
	private int followCnt;
}
