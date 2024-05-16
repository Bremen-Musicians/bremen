package com.bremen.backend.domain.article.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bremen.backend.domain.article.dto.ArticleListResponse;

public interface ArticleChallengeService {
	Page<ArticleListResponse> findArticlesByChallengeId(Long challengeId, Long InstrumentId, Pageable pageable);

	List<ArticleListResponse> findWinnersByChallengeId(Long id);
}
