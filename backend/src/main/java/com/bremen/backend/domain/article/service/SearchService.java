package com.bremen.backend.domain.article.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.bremen.backend.domain.article.repository.ArticleOrderBy;
import com.bremen.backend.global.response.ListResponse;

public interface SearchService {
	ListResponse searchArticle(String category, ArticleOrderBy order, List<Long> instrumentIds, String keyword,
		Pageable pageable);
}
