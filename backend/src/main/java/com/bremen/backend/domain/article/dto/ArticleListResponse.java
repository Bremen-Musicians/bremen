package com.bremen.backend.domain.article.dto;

import com.bremen.backend.domain.user.dto.UserSummaryResponse;
import com.bremen.backend.domain.video.dto.VideoUrlResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArticleListResponse {
	/* ARTICLE */
	private Long id;
	private String title;
	private int hitCnt;

	/* VIDEO */
	VideoUrlResponse video;

	/* USER */
	UserSummaryResponse user;

}
