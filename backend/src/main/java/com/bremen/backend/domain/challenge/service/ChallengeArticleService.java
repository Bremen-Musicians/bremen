package com.bremen.backend.domain.challenge.service;

import java.util.List;

import com.bremen.backend.domain.article.entity.Article;

public interface ChallengeArticleService {
	void addChallengeArticle(Article article);

	int regiestWinners(List<Article> articles);
}
