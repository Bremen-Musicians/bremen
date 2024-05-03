package com.bremen.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.entity.Follow;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.repository.FollowRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService {
	private final FollowRepository followRepository;

	@Override
	@Transactional
	public void addFollow(Follow follow) {
		followRepository.save(follow);
	}

	@Override
	@Transactional
	public void findByFollowAndFollower(User follow, User follower) {
		followRepository.deleteFollowByFollowAndFollower(follow, follower);
	}

	@Override
	public boolean isFollower(User follow, User follower) {
		return followRepository.existsFollowByFollowAndFollower(follow, follower);
	}

	@Override
	@Transactional
	public void follow(User follow, User follower) {

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
	public void unfollow(User follow, User follower) {

		findByFollowAndFollower(follow, follower);

		follower.removeFollow();
		follow.removeFollower();
	}

}
