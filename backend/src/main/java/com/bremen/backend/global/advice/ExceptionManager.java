package com.bremen.backend.global.advice;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;
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

	@ExceptionHandler({IOException.class})
	protected ResponseEntity handleIOException(IOException ex) {
		return new ResponseEntity(new ErrorResponse(400, ex.getMessage()), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(MissingServletRequestPartException.class)
	public ResponseEntity<ErrorResponse> handleMissingServletRequestPartException(MissingServletRequestPartException ex) {
		String missingPartName = ex.getRequestPartName();

		ErrorCode errorCode = switch (missingPartName) {
			case "video" -> ErrorCode.NO_VIDEO_FILE_ATTACHED;
			case "thumbnail" -> ErrorCode.NO_THUMBNAIL_FILE_ATTACHED;
			case "highlight" -> ErrorCode.NO_HIGHLIGHT_FILE_ATTACHED;
			default -> ErrorCode.NO_FILE_ATTACHED;
		};

		ErrorResponse errorResponse = new ErrorResponse(errorCode.getStatus(), errorCode.getMessage());
		return ResponseEntity.badRequest().body(errorResponse);
	}

}
