package com.bremen.backend.domain.article.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.ArticleHashtag;
import com.bremen.backend.domain.article.entity.Hashtag;

@Repository
public interface ArticleHashtagRepository extends JpaRepository<ArticleHashtag, Long> {
	Optional<ArticleHashtag> findByArticleAndHashtag(Article article, Hashtag hashtag);

	@Query("SELECT ah FROM ArticleHashtag ah JOIN FETCH ah.hashtag WHERE ah.article.id = :articleId")
	List<ArticleHashtag> findByArticleId(@Param("articleId") Long articleId);

	List<ArticleHashtag> findByHashtagAndArticleIdNot(Hashtag hashtag, Long articleId);
}
