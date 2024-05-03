package com.bremen.backend.domain.article.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.mapper.ArticleMapper;
import com.bremen.backend.domain.article.repository.ArticleRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
	private final ArticleRepository articleRepository;

	@Override
	public ArticleResponse findArticleById(Long articleId) {
		return ArticleMapper.INSTANCE.articleToArticleResponse(getArticleById(articleId));
	}

	@Override
	public Article getArticleById(Long articleId) {
		return articleRepository.findByIdWithUserAndVideo(articleId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
	}
}
