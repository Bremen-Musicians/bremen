package com.bremen.backend.domain.article.service;

import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.entity.Article;

public interface ArticleService {

	ArticleResponse findArticleById(Long articleId);

	Article getArticleById(Long articleId);
}
