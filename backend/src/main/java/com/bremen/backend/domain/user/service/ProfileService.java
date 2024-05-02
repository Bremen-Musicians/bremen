package com.bremen.backend.domain.user.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.user.dto.UserProfileRequest;
import com.bremen.backend.domain.user.dto.UserProfileUpdateRequest;
import com.bremen.backend.domain.user.dto.UserProfileUpdateResponse;

public interface ProfileService {
	void modifyUserProfile(MultipartFile profileImage, UserProfileRequest userProfileRequest) throws IOException;

	UserProfileUpdateResponse modifyUserProfile(MultipartFile profileImage,
		UserProfileUpdateRequest userProfileUpdateRequest) throws IOException;

	boolean isNoImage(String url);
}
