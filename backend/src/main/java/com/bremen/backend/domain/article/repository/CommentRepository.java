package com.bremen.backend.domain.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
