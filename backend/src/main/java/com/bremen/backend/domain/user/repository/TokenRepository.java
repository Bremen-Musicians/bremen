package com.bremen.backend.domain.user.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.bremen.backend.domain.user.entity.Token;

public interface TokenRepository extends CrudRepository<Token, String> {
	Optional<Token> findByRefreshToken(String refreshToken);
}
