package com.bremen.backend.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT u FROM User u WHERE u.id = :id AND u.isDeleted = false")
	Optional<User> findById(@Param("id") Long id);

	Optional<User> findByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.nickname = :nickname AND u.isDeleted = false")
	Optional<User> findByNickname(String nickname);

	boolean existsByUsername(String username);

	boolean existsByNickname(String nickname);
}
