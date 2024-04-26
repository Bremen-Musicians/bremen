package com.bremen.backend.domain.member.service;

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

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
import com.bremen.backend.domain.member.entity.Member;
import com.bremen.backend.domain.member.mapper.MemberMapper;
import com.bremen.backend.domain.member.repository.MemberRepository;

import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
class MemberServiceTest {

	@InjectMocks
	private MemberServiceImpl memberService;

	@Mock
	private MemberRepository memberRepository;
	static private Member member;
	static private Member modifyMember;

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
	void findMemberById() {
		// given
		when(memberRepository.findById(member.getId())).thenReturn(Optional.of(member));

		// when
		MemberResponse memberResponse = memberService.findMemberById(member.getId());

		// then
		assertThat(memberResponse).isNotNull();
		assertThat(memberResponse.getNickname()).isEqualTo(member.getNickname());
	}

	@Test
	void getMemberById() {
		//given
		when(memberRepository.findById(member.getId())).then((InvocationOnMock invocation) -> Optional.of(member));

		//when
		Member m = memberService.getMemberById(member.getId());

		//then
		assertThat(m.getId()).isEqualTo(member.getId());
	}

	@Test
	void addMember() {
		//given
		MemberRequest memberRequest = MemberMapper.INSTANCE.memberToMemberRequest(member);
		when(memberRepository.save(any(Member.class))).thenReturn(member);

		//when
		MemberResponse memberResponse = memberService.addMember(memberRequest);

		//then
		assertThat(memberResponse.getUsername()).isEqualTo(member.getUsername());
	}

	@Test
	void modifyMember() {
		//given
		Member exMember = Member.builder()
			.id(member.getId())
			.username(member.getUsername())
			.password(member.getPassword())
			.introduce(member.getIntroduce())
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.build();

		String modifyNickname = "modify";
		Member modifyMember = Member.builder()
			.id(member.getId())
			.username(member.getUsername())
			.password(member.getPassword())
			.introduce(member.getIntroduce())
			.nickname(modifyNickname)
			.profileImage(member.getProfileImage())
			.build();

		MemberUpdateRequest memberUpdateRequest = MemberMapper.INSTANCE.memberToMemberUpdateRequest(modifyMember);

		when(memberRepository.findById(memberUpdateRequest.getId())).thenReturn(Optional.of(member));

		//when
		MemberResponse memberResponse = memberService.modifyMember(memberUpdateRequest);

		//then
		assertThat(memberResponse).isNotNull();
		assertThat(exMember.getNickname()).isNotEqualTo(memberResponse.getNickname());
	}

	@Test
	void removeMember() {
		//given
		when(memberRepository.findById(member.getId())).thenReturn(Optional.of(member));

		//when
		Long removedId = memberService.removeMember(member.getId());

		//then
		assertThat(member.getId()).isEqualTo(removedId);
	}
}