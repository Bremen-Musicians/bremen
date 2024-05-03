package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.entity.Follow;
import com.bremen.backend.domain.user.entity.User;

public interface FollowService {
	void addFollow(Follow follow);

	void findByFollowAndFollower(User follow, User follower);

	boolean isFollower(User follow, User follower);

	void follow(User follow, User follower);

	void unfollow(User follow, User follower);
	
}
