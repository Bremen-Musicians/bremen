package com.bremen.backend.domain.article.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.Heart;
import com.bremen.backend.domain.article.repository.LikeRepository;
import com.bremen.backend.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
	private final LikeRepository likeRepository;

	@Override
	public boolean isLikeArticle(Long userId, Long articleId) {
		return likeRepository.existsByUserIdAndArticleId(userId, articleId);
	}

	@Override
	@Transactional
	public void addHeart(Heart heart) {
		likeRepository.save(heart);
	}

	@Override
	@Transactional
	public void likeArticle(User user, Article article) {
		Heart heart = Heart.builder()
			.article(article)
			.user(user)
			.build();
		addHeart(heart);

		article.likeArticle();
	}

	@Override
	@Transactional
	public void unlikeArticle(User user, Article article) {
		likeRepository.deleteHeartByUserIdAndArticleId(user.getId(), article.getId());

		article.unlikeArticle();
	}
}
