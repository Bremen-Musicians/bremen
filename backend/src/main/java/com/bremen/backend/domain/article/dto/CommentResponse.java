package com.bremen.backend.domain.article.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentResponse {
	private Long id;
	private Long groupId;
	private int groupCnt;
	private String content;
	private String writerNickname;
	private boolean isDeleted;
	private boolean isUpdated;
}
