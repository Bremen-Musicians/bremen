package com.bremen.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.mapper.UserMapper;
import com.bremen.backend.domain.user.repository.UserRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;

	@Override
	public UserResponse findUserById(Long userId) {
		User user = getUserById(userId);
		return UserMapper.INSTANCE.userToUserResponse(user);
	}

	@Override
	public User getUserById(Long userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
		return user;
	}

	@Override
	@Transactional
	public UserResponse addUser(UserRequest userRequest) {
		User user = UserMapper.INSTANCE.userRequestToUser(userRequest);
		User savedUser = userRepository.save(user);
		return UserMapper.INSTANCE.userToUserResponse(savedUser);
	}

	@Override
	@Transactional
	public User addUser(User user) {
		User savedUser = userRepository.save(user);
		return savedUser;
	}

	@Override
	@Transactional
	public UserResponse modifyUser(UserUpdateRequest userUpdateRequest) {
		User user = getUserById(userUpdateRequest.getId());
		user.modifyUserInformation(
			userUpdateRequest
		);
		return UserMapper.INSTANCE.userToUserResponse(user);
	}

	@Override
	@Transactional
	public Long removeUser(Long userId) {
		User user = getUserById(userId);
		user.deleteUser();
		return user.getId();
	}

	@Override
	public void duplicateUsername(String username) {
		boolean exist = userRepository.existsByUsername(username);
		if (exist) {
			throw new CustomException(ErrorCode.CONFLICT_USER);
		}

	}

	@Override
	public void duplicateNickname(String nickname) {
		boolean exist = userRepository.existsByNickname(nickname);
		if (exist) {
			throw new CustomException(ErrorCode.CONFLICT_USER);
		}

	}
}
