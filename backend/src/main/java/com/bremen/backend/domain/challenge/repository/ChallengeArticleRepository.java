package com.bremen.backend.domain.challenge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.challenge.entity.ChallengeArticle;

public interface ChallengeArticleRepository extends JpaRepository<ChallengeArticle, Long> {
	@Query("SELECT ca FROM ChallengeArticle ca WHERE ca.article in :articles")
	List<ChallengeArticle> findByArticle(@Param("articles") List<Article> articles);
}
