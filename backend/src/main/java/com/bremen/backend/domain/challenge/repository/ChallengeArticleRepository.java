package com.bremen.backend.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bremen.backend.domain.challenge.entity.ChallengeArticle;

public interface ChallengeArticleRepository extends JpaRepository<ChallengeArticle, Long> {
}
