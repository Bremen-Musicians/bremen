package com.bremen.backend.domain.article.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.mapper.ArticleMapper;
import com.bremen.backend.domain.article.repository.ArticleOrderBy;
import com.bremen.backend.domain.article.repository.ArticleSearchQueryDslRepository;
import com.bremen.backend.global.response.ListResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
	private final ArticleSearchQueryDslRepository articleSearchQueryDslRepository;

	@Override
	@Transactional(readOnly = true)
	public ListResponse searchArticle(String category, ArticleOrderBy order, List<Long> instrumentIds,
		String keyword,
		Pageable pageable) {
		Page<Article> pages = articleSearchQueryDslRepository.searchAll(category, order, instrumentIds, keyword,
			pageable);

		List<ArticleResponse> articles = pages.getContent()
			.stream()
			.map(ArticleMapper.INSTANCE::articleToArticleResponse)
			.collect(Collectors.toList());
		return new ListResponse(articles, pages.getTotalElements(), pages.getPageable());
	}
}
