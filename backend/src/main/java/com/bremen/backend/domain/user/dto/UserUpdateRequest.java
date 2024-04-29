package com.bremen.backend.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserUpdateRequest {

	private Long id; // 추후 토큰으로 유저 불러올 예정

	@NotNull(message = "닉네임은 비어있을 수 없습니다.")
	private String nickname;

	private String introduce;

	private String profileImage;
}
