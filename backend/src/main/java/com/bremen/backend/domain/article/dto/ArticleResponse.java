package com.bremen.backend.domain.article.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleResponse {
	private Long id;
	private String title;
	private String content;
	private int hitCnt;
	private int likeCnt;
	private LocalDateTime createTime;
	private Long userId;
	private String username;
	private String nickname;
	private Long videoId;
	private String videoUrl;
	private String imageUrl;
	private boolean isLike;
	private List<String> hashtags;
}
