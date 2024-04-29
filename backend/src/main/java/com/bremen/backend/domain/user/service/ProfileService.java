package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.dto.UserProfileRequest;

public interface ProfileService {
	void modifyUserProfile(UserProfileRequest userProfileRequest);
}
