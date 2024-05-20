package com.bremen.backend.domain.user.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.bremen.backend.domain.user.entity.BlackToken;

public interface BlackTokenRepository extends CrudRepository<BlackToken, String> {
	Optional<BlackToken> findByAccessToken(String accessToken);
}