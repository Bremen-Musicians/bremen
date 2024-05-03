package com.bremen.backend.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.user.entity.Follow;
import com.bremen.backend.domain.user.entity.User;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

	void deleteFollowByFollowAndFollower(User Follow, User Follower);

	boolean existsFollowByFollowAndFollower(User Follow, User Follower);
}
