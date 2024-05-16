package com.bremen.backend.domain.article.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.bremen.backend.domain.article.dto.ArticleRequest;
import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.dto.ArticleUpdateRequest;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.repository.ArticleOrderBy;
import com.bremen.backend.global.response.ListResponse;

public interface ArticleService {

	ArticleResponse findArticleById(Long articleId);

	Article getArticleById(Long articleId);

	ArticleResponse addArticle(ArticleRequest articleRequest);

	ArticleResponse modifyArticle(ArticleUpdateRequest articleUpdateRequest);

	Long removeArticle(Long id);

	List<ArticleResponse> findEnsembleArticles(Long musicId, List<Long> instrumentsIds, String title, String nickname);

	List<ArticleResponse> findArticleByUser(Long userId);

	ListResponse findArticle(ArticleOrderBy articleOrderBy, Pageable pageable);

	ListResponse findRelatedArticle(Long id, Pageable pageable);
}
