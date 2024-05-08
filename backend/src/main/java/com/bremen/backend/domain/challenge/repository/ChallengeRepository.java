package com.bremen.backend.domain.challenge.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.challenge.entity.Challenge;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
	@Query("SELECT c FROM Challenge c WHERE c.isDeleted = false ORDER BY c.endTime DESC LIMIT 1")
	Optional<Challenge> findFirstByOrderByEndTimeDesc();
}
