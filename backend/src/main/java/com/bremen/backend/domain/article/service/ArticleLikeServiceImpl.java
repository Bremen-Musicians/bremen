package com.bremen.backend.domain.article.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleLikeServiceImpl implements ArticleLikeService {
	private final ArticleService articleService;
	private final UserService userService;
	private final LikeService likeService;

	@Transactional
	public int toggleLikeArticle(Long id) {
		Article article = articleService.getArticleById(id);
		User user = userService.getUserByToken();

		if (likeService.isLikeArticle(user.getId(), article.getId())) {
			likeService.unlikeArticle(user, article);
		} else {
			likeService.likeArticle(user, article);
		}
		return article.getLikeCnt();
	}
}
