package com.bremen.backend.domain.article.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Comment;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	@Query("SELECT c FROM Comment c JOIN FETCH c.user WHERE c.id = :commentId")
	Optional<Comment> findById(@Param("commentId") Long commentId);

	List<Comment> findAllByGroupId(Long groupId);

	List<Comment> findAllByArticleIdOrderByGroupAscCreateTimeDesc(Long articleId);
}
