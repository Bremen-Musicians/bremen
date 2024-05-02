package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.entity.Follow;
import com.bremen.backend.domain.user.entity.User;

public interface FollowService {
	void addFollow(Follow follow);
	void findByFollowAndFollower(User follow,User follower);
	void follow(Long followingId);
	void unfollow(Long followingId);
}
