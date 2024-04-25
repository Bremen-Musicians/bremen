package com.bremen.backend.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResponse {
	private String nickname;
	private String introduce;
	private String profileImage;
	private int followerCnt;
	private int followCnt;
}
