package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.entity.User;

public interface UserService {
	UserResponse findUserById(Long memberId);

	User getUserById(Long memberId);

	UserResponse addUser(UserRequest userRequest);

	UserResponse modifyUser(UserUpdateRequest userUpdateRequest);

	Long removeUser(Long memberId);

}
