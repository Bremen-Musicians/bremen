package com.bremen.backend.domain.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Heart;

@Repository
public interface LikeRepository extends JpaRepository<Heart, Integer> {

	boolean existsByUserIdAndArticleId(Long userId, Long articleId);

	void deleteHeartByUserIdAndArticleId(Long userId, Long articleId);
}
