package com.bremen.backend.domain.article.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.ArticleHashtag;
import com.bremen.backend.domain.article.entity.Hashtag;

@Repository
public interface ArticleHashtagRepository extends JpaRepository<ArticleHashtag, Long> {
	Optional<ArticleHashtag> findByArticleAndHashtag(Article article, Hashtag hashtag);
}
