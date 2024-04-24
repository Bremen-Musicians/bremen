package com.bremen.backend.global.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorResponse;

@RestControllerAdvice
public class ExceptionManager {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
		StringBuilder errorMessage = new StringBuilder();
		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errorMessage.append(error.getDefaultMessage()).append("; ");
		}
		return ResponseEntity.ok(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), errorMessage.toString()));
	}

	@ExceptionHandler({CustomException.class})
	protected ResponseEntity handleCustomException(CustomException ex) {
		return new ResponseEntity(new ErrorResponse(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()),
			HttpStatus.valueOf(ex.getErrorCode().getStatus()));
	}

}
