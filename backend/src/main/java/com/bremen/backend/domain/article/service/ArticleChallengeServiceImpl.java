package com.bremen.backend.domain.article.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.dto.ArticleListResponse;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.mapper.ArticleMapper;
import com.bremen.backend.domain.article.repository.ArticleChallengeQueryDslRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleChallengeServiceImpl implements ArticleChallengeService {
	private final ArticleChallengeQueryDslRepository repository;

	@Override
	@Transactional(readOnly = true)
	public Page<ArticleListResponse> findArticlesByChallengeId(Long challengeId, Long instrumentId, Pageable pageable) {
		Page<Article> articles = repository.findChallengeArticle(challengeId, instrumentId, pageable);
		return articles.map(ArticleMapper.INSTANCE::articleToArticleListResponse);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ArticleListResponse> findWinnersByChallengeId(Long challengeId) {
		List<Article> articles = repository.findChallengeWinnerArticle(challengeId);
		return articles.stream().map(ArticleMapper.INSTANCE::articleToArticleListResponse).collect(Collectors.toList());
	}
}
