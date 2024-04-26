package com.bremen.backend.domain.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
import com.bremen.backend.domain.member.entity.Member;
import com.bremen.backend.domain.member.mapper.MemberMapper;
import com.bremen.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;

	@Override
	public MemberResponse findMemberById(Long memberId) {
		Member member = getMemberById(memberId);
		return MemberMapper.INSTANCE.memberToMemberResponse(member);
	}

	@Override
	public Member getMemberById(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
		return member;
	}

	@Override
	public MemberResponse addMember(MemberRequest memberRequest) {
		Member member = MemberMapper.INSTANCE.memberRequestToMember(memberRequest);
		Member savedMember = memberRepository.save(member);
		return MemberMapper.INSTANCE.memberToMemberResponse(savedMember);
	}

	@Override
	@Transactional
	public MemberResponse modifyMember(MemberUpdateRequest memberUpdateRequest) {
		Member member = getMemberById(memberUpdateRequest.getId());

		member.modifyUserInformation(
			memberUpdateRequest
		);

		return MemberMapper.INSTANCE.memberToMemberResponse(member);
	}

	@Override
	public Long removeMember(Long memberId) {
		Member member = getMemberById(memberId);
		member.deleteUser();
		return member.getId();
	}

}
