package com.bremen.backend.domain.article.service;

import java.util.List;
import java.util.Set;

import com.bremen.backend.domain.article.entity.Article;

public interface ArticleHashtagService {
	List<String> addHashtags(Article article, Set<String> hashtags);

	List<String> modifyHashtags(Article article, Set<String> hashtags);

	int removeHashtags(Long articleId);
}
