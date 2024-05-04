package com.bremen.backend.domain.article.service;

public interface LikeService {
	int toggleLikeArticle(Long id);

	boolean isLikeArticle(Long userId, Long articleId);

}
