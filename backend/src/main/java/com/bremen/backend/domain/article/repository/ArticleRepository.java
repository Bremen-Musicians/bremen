package com.bremen.backend.domain.article.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.video.entity.Video;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
	@Query("SELECT a FROM Article a JOIN FETCH a.user JOIN FETCH a.video WHERE a.id = :id AND a.isDeleted = false")
	Optional<Article> findById(@Param("id") Long id);

	@Query("SELECT a FROM Article a WHERE a.user.nickname = :nickname AND a.isDeleted = false")
	List<Article> findArticlesByNickname(@Param("nickname") String nickname);

	@Query("SELECT a FROM Article a WHERE a.video = :video")
	Article findByVideo(@Param("video") Video video);
}
