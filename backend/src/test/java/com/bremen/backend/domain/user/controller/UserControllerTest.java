package com.bremen.backend.domain.user.controller;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.bremen.backend.domain.user.dto.UserRequest;
import com.bremen.backend.domain.user.dto.UserResponse;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.mapper.UserMapper;
import com.bremen.backend.domain.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@WebMvcTest(UserController.class)
@WithMockUser(roles = "USER")
@Slf4j
public class UserControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private UserService userService;

	private ObjectMapper objectMapper = new ObjectMapper();

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
	public void 유저조회() throws Exception {

		when(userService.findUserById(user.getId())).thenReturn(
			UserMapper.INSTANCE.userToUserResponse(user));

		mockMvc.perform(
				get("/api/v1/users").param("id", String.valueOf(1))
			)
			.andExpect(
				status().isOk()
			)
			.andExpect(
				jsonPath("$.data.nickname").value(user.getNickname())
			)
			.andExpect(
				jsonPath("$.data.introduce").value(user.getIntroduce())
			);

	}

	@Test
	public void 유저생성() throws Exception {

		UserResponse userResponse = UserMapper.INSTANCE.userToUserResponse(user);
		UserRequest userRequest = UserMapper.INSTANCE.userToUserRequest(user);

		String json = objectMapper.writeValueAsString(userRequest);

		when(userService.addUser(userRequest)).thenReturn(userResponse);

		mockMvc.perform(
				post("/api/v1/users").contentType(MediaType.APPLICATION_JSON).content(json).with(csrf())
			)
			.andExpect(
				status().isOk()
			)
			.andExpect(
				jsonPath("$.data.username").value(user.getUsername())
			)
			.andExpect(
				jsonPath("$.data.nickname").value(user.getNickname())
			);
	}

	@Test
	public void 유저수정() throws Exception {
		String nickname = "modify";
		UserUpdateRequest userUpdateRequest = UserMapper.INSTANCE.userToUserUpdateRequest(user);
		userUpdateRequest.setNickname(nickname);

		user.modifyUserInformation(userUpdateRequest);
		// 수정할 입력값을 받아요
		String json = objectMapper.writeValueAsString(userUpdateRequest);

		when(userService.modifyUser(userUpdateRequest)).thenReturn(
			UserMapper.INSTANCE.userToUserResponse(user));

		mockMvc
			.perform(
				patch("/api/v1/users").contentType(MediaType.APPLICATION_JSON).content(json).with(csrf())
			)
			.andExpect(
				status().isOk()
			)
			.andExpect(
				jsonPath("$.data.nickname").value(nickname)
			);
	}

	@Test
	public void 유저삭제() throws Exception {
		when(userService.removeUser(user.getId())).thenReturn(user.getId());

		mockMvc.perform(
				delete("/api/v1/users/{id}", user.getId()).with(csrf())
			)
			.andExpect(status().isOk());
	}

}
