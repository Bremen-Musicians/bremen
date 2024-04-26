package com.bremen.backend.domain.member.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.springframework.boot.test.context.SpringBootTest;

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
import com.bremen.backend.domain.member.entity.Member;
import com.bremen.backend.domain.member.mapper.MemberMapper;
import com.bremen.backend.domain.member.repository.MemberRepository;

@SpringBootTest
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

		String modifyNickname = "modify";

		member = Member.builder()
			.id(id)
			.username(username)
			.password(password)
			.introduce(intro)
			.nickname(nickname)
			.profileImage(profile)
			.build();

		modifyMember = Member.builder()
			.id(id)
			.username(username)
			.password(password)
			.introduce(intro)
			.nickname(modifyNickname)
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
		when(memberRepository.save(member)).thenReturn(member);

		//when
		MemberResponse memberResponse = memberService.addMember(memberRequest);

		//then
		assertThat(memberResponse.getUsername()).isEqualTo(member.getUsername());
	}

	@Test
	void modifyMember() {
		//given
		MemberUpdateRequest memberUpdateRequest = MemberMapper.INSTANCE.memberToMemberUpdateRequest(modifyMember);

		when(memberRepository.findById(memberUpdateRequest.getId())).thenReturn(Optional.of(member));
		//when
		MemberResponse memberResponse = memberService.modifyMember(memberUpdateRequest);

		//then
		assertThat(member.getNickname()).isNotEqualTo(memberResponse.getNickname());
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