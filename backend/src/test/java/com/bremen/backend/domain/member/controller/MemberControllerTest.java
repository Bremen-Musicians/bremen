package com.bremen.backend.domain.member.controller;

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

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
import com.bremen.backend.domain.member.entity.Member;
import com.bremen.backend.domain.member.mapper.MemberMapper;
import com.bremen.backend.domain.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@WebMvcTest(MemberController.class)
@WithMockUser(roles = "USER")
@Slf4j
public class MemberControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private MemberService memberService;

	private ObjectMapper objectMapper = new ObjectMapper();

	static private Member member;

	@BeforeAll
	public static void 세팅() {
		long id = 1L;
		String username = "test@email.com";
		String password = "test";
		String intro = "hello?";
		String nickname = "test";
		String profile = "image";

		member = Member.builder()
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

		when(memberService.findMemberById(member.getId())).thenReturn(
			MemberMapper.INSTANCE.memberToMemberResponse(member));

		mockMvc.perform(
				get("/api/v1/members/{id}", member.getId())
			)
			.andExpect(
				status().isOk()
			)
			.andExpect(
				jsonPath("$.data.nickname").value(member.getNickname())
			)
			.andExpect(
				jsonPath("$.data.introduce").value(member.getIntroduce())
			);

	}

	@Test
	public void 유저생성() throws Exception {

		MemberResponse memberResponse = MemberMapper.INSTANCE.memberToMemberResponse(member);
		MemberRequest memberRequest = MemberMapper.INSTANCE.memberToMemberRequest(member);

		String json = objectMapper.writeValueAsString(memberRequest);

		when(memberService.addMember(memberRequest)).thenReturn(memberResponse);

		mockMvc.perform(
				post("/api/v1/members").contentType(MediaType.APPLICATION_JSON).content(json).with(csrf())
			)
			.andExpect(
				status().isOk()
			)
			.andExpect(
				jsonPath("$.data.username").value(member.getUsername())
			)
			.andExpect(
				jsonPath("$.data.nickname").value(member.getNickname())
			);
	}

	@Test
	public void 유저수정() throws Exception {
		String nickname = "modify";
		MemberUpdateRequest memberUpdateRequest = MemberMapper.INSTANCE.memberToMemberUpdateRequest(member);
		memberUpdateRequest.setNickname(nickname);

		member.modifyUserInformation(memberUpdateRequest);
		// 수정할 입력값을 받아요
		String json = objectMapper.writeValueAsString(memberUpdateRequest);

		when(memberService.modifyMember(memberUpdateRequest)).thenReturn(
			MemberMapper.INSTANCE.memberToMemberResponse(member));

		mockMvc
			.perform(
				patch("/api/v1/members").contentType(MediaType.APPLICATION_JSON).content(json).with(csrf())
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
		when(memberService.removeMember(member.getId())).thenReturn(member.getId());

		mockMvc.perform(
				delete("/api/v1/members/{id}", member.getId()).with(csrf())
			)
			.andExpect(status().isOk());
	}

}
