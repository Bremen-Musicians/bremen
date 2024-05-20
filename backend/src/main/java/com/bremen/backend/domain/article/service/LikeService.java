package com.bremen.backend.domain.article.service;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.Heart;
import com.bremen.backend.domain.user.entity.User;

public interface LikeService {
	boolean isLikeArticle(Long userId, Long articleId);

	void addHeart(Heart heart);

	void likeArticle(User user, Article article);

	void unlikeArticle(User user, Article article);
}
