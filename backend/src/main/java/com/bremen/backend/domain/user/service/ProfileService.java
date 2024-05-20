package com.bremen.backend.domain.user.service;

import java.io.IOException;

import com.bremen.backend.domain.user.dto.UserProfileRequest;
import com.bremen.backend.domain.user.dto.UserProfileUpdateRequest;
import com.bremen.backend.domain.user.dto.UserProfileUpdateResponse;

public interface ProfileService {
	void modifyUserProfile(UserProfileRequest userProfileRequest) throws IOException;

	UserProfileUpdateResponse modifyUserProfile(
		UserProfileUpdateRequest userProfileUpdateRequest) throws IOException;

	boolean isNoImage(String url);
}
