package com.bremen.backend.member;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.bremen.backend.domain.member.controller.MemberController;
import com.bremen.backend.domain.member.entity.Member;
import com.bremen.backend.domain.member.mapper.MemberMapper;
import com.bremen.backend.domain.member.service.MemberService;

@WebMvcTest(MemberController.class)
@WithMockUser(roles = "USER")
public class MemberControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private MemberService memberService;

	@Test
	public void 유저조회() throws Exception {
		long memberId = 1L;
		String intro = "hello world";
		String nickname = "nickname";

		Member member = Member.builder()
			.id(memberId)
			.introduce(intro)
			.nickname(nickname)
			.build();

		when(memberService.findMember(memberId)).thenReturn(MemberMapper.INSTANCE.memberToMemberResponse(member));

		mockMvc.perform(
				get("/api/v1/members/{id}", memberId))
			.andExpect(
				status().isOk()
			)
			.andExpect(
				jsonPath("$.data.nickname").value("nickname")
			)
			.andExpect(
				jsonPath("$.data.introduce").value("hello world")
			);

	}
}
