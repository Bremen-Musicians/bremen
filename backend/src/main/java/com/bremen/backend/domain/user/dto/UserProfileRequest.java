package com.bremen.backend.domain.user.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserProfileRequest {
	@NotBlank(message = "아이디는 비어있을 수 없습니다.")
	@Email
	private String username;
	private String profileUrl;
	private MultipartFile profileImage;
	private String introduce;

}
