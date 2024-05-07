package com.bremen.backend.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.challenge.entity.Challenge;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
	Challenge findFirstByOrderByEndTimeDesc();
}
