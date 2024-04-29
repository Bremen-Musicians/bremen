package com.bremen.backend.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

	//400 BAD_REQUEST 잘못된 요청
	INVALID_PARAMETER(400, "파라미터 값을 확인해주세요."),

	//403
	UNAUTHORIZED_ERROR(403, "접근 권한을 확인해주세요."),

	//404 NOT_FOUND 잘못된 리소스 접근

	//409 CONFLICT 중복된 리소스

	//500 INTERNAL SERVER ERROR
	INTERNAL_SERVER_ERROR(500, "서버 에러입니다.");

	private final int status;
	private final String message;
}
