package com.bremen.backend.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

	//400 BAD_REQUEST 잘못된 요청
	INVALID_PARAMETER(400, "파라미터 값을 확인해주세요."),
	REQUIRED_AGREE(400, "약관에 동의하지않으면 서비스를 이용할 수 없습니다."),

	//404 NOT_FOUND 잘못된 리소스 접근
	NOT_FOUND_USER(404, "해당하는 사용자가 없습니다."),
	//409 CONFLICT 중복된 리소스
	CONFLICT_USER(409, "중복된 유저입니다"),

	//500 INTERNAL SERVER ERROR
	INTERNAL_SERVER_ERROR(500, "서버 에러입니다.");

	private final int status;
	private final String message;
}
