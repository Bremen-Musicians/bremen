package com.bremen.backend.domain.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.user.dto.UserProfileUpdateResponse;
import com.bremen.backend.domain.user.dto.UserRegistrationRequest;
import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.entity.User;

@Mapper
public interface UserMapper {
	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	UserResponse userToUserResponse(User user);

	User userRequestToUser(UserRequest userRequest);

	UserRequest userToUserRequest(User user);

	UserUpdateRequest userToUserUpdateRequest(User user);

	User userRegistrationToUser(UserRegistrationRequest userRegistrationRequest);

	UserProfileUpdateResponse userToUserProfileUpdateResponse(User user);

}
