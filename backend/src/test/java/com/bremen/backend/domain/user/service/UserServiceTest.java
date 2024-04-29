package com.bremen.backend.domain.user.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.mapper.UserMapper;
import com.bremen.backend.domain.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
class UserServiceTest {

	@InjectMocks
	private UserServiceImpl userService;

	@Mock
	private UserRepository userRepository;
	static private User user;

	@BeforeAll
	public static void 세팅() {
		long id = 1L;
		String username = "test@email.com";
		String password = "test";
		String intro = "hello?";
		String nickname = "test";
		String profile = "image";

		user = User.builder()
			.id(id)
			.username(username)
			.password(password)
			.introduce(intro)
			.nickname(nickname)
			.profileImage(profile)
			.build();

	}

	@Test
	void 유저데이터조회() {
		// given
		when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

		// when
		UserResponse userResponse = userService.findUserById(user.getId());

		// then
		assertThat(userResponse).isNotNull();
		assertThat(userResponse.getNickname()).isEqualTo(user.getNickname());
	}

	@Test
	void 유저데이터가져오기() {
		//given
		when(userRepository.findById(user.getId())).then((InvocationOnMock invocation) -> Optional.of(user));

		//when
		User m = userService.getUserById(user.getId());

		//then
		assertThat(m.getId()).isEqualTo(user.getId());
	}

	@Test
	void 유저추가() {
		//given
		UserRequest userRequest = UserMapper.INSTANCE.userToUserRequest(user);
		when(userRepository.save(any(User.class))).thenReturn(user);

		//when
		UserResponse userResponse = userService.addUser(userRequest);

		//then
		assertThat(userResponse.getUsername()).isEqualTo(user.getUsername());
	}

	@Test
	void 유저수정() {
		//given
		User exUser = User.builder()
			.id(user.getId())
			.username(user.getUsername())
			.password(user.getPassword())
			.introduce(user.getIntroduce())
			.nickname(user.getNickname())
			.profileImage(user.getProfileImage())
			.build();

		String modifyNickname = "modify";
		User modifyUser = User.builder()
			.id(user.getId())
			.username(user.getUsername())
			.password(user.getPassword())
			.introduce(user.getIntroduce())
			.nickname(modifyNickname)
			.profileImage(user.getProfileImage())
			.build();

		UserUpdateRequest userUpdateRequest = UserMapper.INSTANCE.userToUserUpdateRequest(modifyUser);

		when(userRepository.findById(userUpdateRequest.getId())).thenReturn(Optional.of(user));

		//when
		UserResponse userResponse = userService.modifyUser(userUpdateRequest);

		//then
		assertThat(userResponse).isNotNull();
		assertThat(exUser.getNickname()).isNotEqualTo(userResponse.getNickname());
	}

	@Test
	void 유저삭제() {
		//given
		when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

		//when
		Long removedId = userService.removeUser(user.getId());

		//then
		assertThat(user.getId()).isEqualTo(removedId);
	}
}