package com.bremen.backend.domain.user.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.dto.UserProfileRequest;
import com.bremen.backend.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
	private final UserDetailsService userDetailsService;

	@Override
	@Transactional
	public void modifyUserProfile(UserProfileRequest userProfileRequest) {
		User user = (User)userDetailsService.loadUserByUsername(userProfileRequest.getUsername());
		user.modifyUserProfile(userProfileRequest);
	}
}
