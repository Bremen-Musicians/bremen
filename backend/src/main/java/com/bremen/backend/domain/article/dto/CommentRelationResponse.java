package com.bremen.backend.domain.article.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentRelationResponse {
	private Long id;
	private int groupCnt;
	private String content;
	private String writerNickname;
	private boolean isDeleted;
	private boolean isUpdated;
	private LocalDateTime createTime;
	private List<CommentRelationResponse> children;

	public void addChildrenCnt() {
		groupCnt += 1;
	}
}
