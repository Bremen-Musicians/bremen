package com.bremen.backend.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.user.entity.Follow;
import com.bremen.backend.domain.user.entity.User;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {
	Optional<Follow> deleteFollowByFollowAndFollower(User Follow,User Follower);
}
