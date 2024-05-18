package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.entity.User;

public interface UserService {
	UserResponse findUserByNickname(String nickname);

	User getUserById(Long memberId);

	User getUserByUsername(String username);

	User getUserByNickname(String nickname);

	User getUserByToken();

	UserResponse addUser(UserRequest userRequest);

	User addUser(User user);

	UserResponse modifyUser(UserUpdateRequest userUpdateRequest);

	Long removeUser(Long memberId);

	void duplicateUsername(String username);

	void duplicateNickname(String nickname);

	boolean isAuthenticated();

	void isEqualUser(User user);
}
