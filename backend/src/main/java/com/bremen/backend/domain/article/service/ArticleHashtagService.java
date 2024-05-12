package com.bremen.backend.domain.article.service;

import java.util.List;
import java.util.Set;

import com.bremen.backend.domain.article.dto.HashTagResponse;
import com.bremen.backend.domain.article.entity.Article;

public interface ArticleHashtagService {
	List<HashTagResponse> addHashtags(Article article, Set<String> hashtags);
}
