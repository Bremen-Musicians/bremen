package com.bremen.backend.domain.user.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
	private String nickname;
	private String introduce;
	private MultipartFile profileImage;
}
