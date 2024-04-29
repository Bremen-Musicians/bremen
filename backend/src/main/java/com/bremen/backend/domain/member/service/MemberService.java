package com.bremen.backend.domain.member.service;

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
import com.bremen.backend.domain.member.entity.Member;

public interface MemberService {
	MemberResponse findMemberById(Long memberId);

	Member getMemberById(Long memberId);

	MemberResponse addMember(MemberRequest memberRequest);

	MemberResponse modifyMember(MemberUpdateRequest memberUpdateRequest);

	Long removeMember(Long memberId);

}
