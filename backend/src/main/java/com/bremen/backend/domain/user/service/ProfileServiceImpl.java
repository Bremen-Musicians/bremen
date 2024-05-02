package com.bremen.backend.domain.user.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.user.dto.UserProfileRequest;
import com.bremen.backend.domain.user.dto.UserProfileUpdateRequest;
import com.bremen.backend.domain.user.dto.UserProfileUpdateResponse;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.mapper.UserMapper;
import com.bremen.backend.global.infra.s3.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
	private final UserService userService;
	private final S3Service s3Service;

	@Override
	@Transactional
	public void modifyUserProfile(MultipartFile profileImage, UserProfileRequest userProfileRequest) throws
		IOException {
		User user = userService.getUserByUsername(userProfileRequest.getUsername());
		if (!profileImage.isEmpty()) {
			//이미지를 첨부하지 않고 랜덤이미지를 사용할경우
			user.modifyUserProfile(userProfileRequest.getProfileImage(), user.getIntroduce());
		} else {
			String url = s3Service.streamUpload("profile", profileImage);
			user.modifyUserProfile(url, userProfileRequest.getIntroduce());
		}
	}

	@Override
	public UserProfileUpdateResponse modifyUserProfile(MultipartFile profileImage,
		UserProfileUpdateRequest userProfileUpdateRequest) throws IOException {
		User user = userService.getUserByToken();
		if (!profileImage.isEmpty()) {
			if (!isNoImage(user.getProfileImage())) {
				s3Service.deleteObject(user.getProfileImage()); // 기존 사진을 삭제하고
			}
			String url = s3Service.streamUpload("profile", profileImage);

			user.modifyUserProfile(userProfileUpdateRequest.getNickname(), url,
				userProfileUpdateRequest.getIntroduce());
		}
		return UserMapper.INSTANCE.userToUserProfileUpdateResponse(user);
	}

	@Override
	public boolean isNoImage(String profileImage) {
		String[] BASE_IMAGE_URL = {"profile/no_image_1", "profile/no_image_2", "profile/no_image_3",
			"profile/no_image_4", "profile/no_image_5"};

		for (String path : BASE_IMAGE_URL) {
			if (path.equals(profileImage)) {
				return true;
			}
		}

		return false;
	}

}
