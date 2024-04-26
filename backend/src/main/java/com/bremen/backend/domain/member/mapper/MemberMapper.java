package com.bremen.backend.domain.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.member.dto.MemberRequest;
import com.bremen.backend.domain.member.dto.MemberResponse;
import com.bremen.backend.domain.member.dto.MemberUpdateRequest;
import com.bremen.backend.domain.member.entity.Member;

@Mapper
public interface MemberMapper {
	MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

	MemberResponse memberToMemberResponse(Member member);

	Member memberRequestToMember(MemberRequest memberRequest);

	MemberRequest memberToMemberRequest(Member member);

	MemberUpdateRequest memberToMemberUpdateRequest(Member member);
}
