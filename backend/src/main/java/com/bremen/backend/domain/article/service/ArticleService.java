package com.bremen.backend.domain.article.service;

import java.util.List;

import com.bremen.backend.domain.article.dto.ArticleRequest;
import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.dto.ArticleUpdateRequest;
import com.bremen.backend.domain.article.entity.Article;

public interface ArticleService {

	ArticleResponse findArticleById(Long articleId);

	Article getArticleById(Long articleId);

	ArticleResponse addArticle(ArticleRequest articleRequest);

	ArticleResponse modifyArticle(ArticleUpdateRequest articleUpdateRequest);

	Long removeArticle(Long id);

	List<ArticleResponse> findEnsembleArticles(Long musicId, List<Long> instrumentsIds, String title, String nickname);

	List<ArticleResponse> findArticleByUser(Long userId);
}
