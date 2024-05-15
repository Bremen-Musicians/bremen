package com.bremen.backend.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSummaryResponse {
	private Long id;
	private String nickname;
	private String profileImageUrl;
}
