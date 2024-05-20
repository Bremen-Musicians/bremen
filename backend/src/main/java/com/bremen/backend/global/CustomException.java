package com.bremen.backend.global;

import com.bremen.backend.global.response.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
	private final ErrorCode errorCode;
}
