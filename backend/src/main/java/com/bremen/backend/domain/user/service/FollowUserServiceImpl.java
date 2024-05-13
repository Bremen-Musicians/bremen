package com.bremen.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.notification.service.NotificationService;
import com.bremen.backend.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FollowUserServiceImpl implements FollowUserService {
	private final UserService userService;
	private final FollowService followService;

	private final NotificationService notificationService;

	@Override
	@Transactional
	public boolean followUser(Long followingId) {
		User follower = userService.getUserByToken(); // 토큰으로 현재 로그인한 유저 조회
		User follow = userService.getUserById(followingId);

		boolean isExist = followService.isFollower(follow, follower);

		if (isExist) {
			// 이미 팔로우 하고있다면
			followService.unfollow(follow, follower);
			return false;
		} else {
			followService.follow(follow, follower);
			notificationService.followNotificationCreate(follow,follower);
			return true;
		}

	}
}
