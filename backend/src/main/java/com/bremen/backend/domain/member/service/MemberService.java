package com.bremen.backend.domain.member.service;

import com.bremen.backend.domain.member.dto.MemberResponse;

public interface MemberService {
	MemberResponse findMember(Long memberId);
}
