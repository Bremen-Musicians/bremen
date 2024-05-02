package com.bremen.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.entity.Follow;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.repository.FollowRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService{
	private final FollowRepository followRepository;
	private final UserService userService;

	@Override
	public void addFollow(Follow follow) {
		followRepository.save(follow);
	}

	@Override
	public void findByFollowAndFollower(User follow, User follower) {
		followRepository.deleteFollowByFollowAndFollower(follow,follower);
	}

	@Override
	@Transactional
	public void follow(Long followingId) {
		User follower = userService.getUserByToken(); // 토큰으로 현재 로그인한 유저 조회
		User follow = userService.getUserById(followingId);

		Follow newFollow = Follow.builder()
			.follow(follow)
			.follower(follower)
			.build();

		addFollow(newFollow);

		follower.addFollow();
		follow.addFollower();
	}

	@Override
	@Transactional
	public void unfollow(Long followingId) {
		User follower = userService.getUserByToken(); // 토큰으로 현재 로그인한 유저 조회
		User follow = userService.getUserById(followingId);

		findByFollowAndFollower(follow,follower);

		follower.removeFollow();
		follow.removeFollower();
	}
}
