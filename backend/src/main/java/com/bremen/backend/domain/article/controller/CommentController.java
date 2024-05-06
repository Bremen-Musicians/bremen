package com.bremen.backend.domain.article.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bremen.backend.domain.article.dto.CommentRequest;
import com.bremen.backend.domain.article.dto.CommentResponse;
import com.bremen.backend.domain.article.dto.CommentUpdateRequest;
import com.bremen.backend.domain.article.service.CommentService;
import com.bremen.backend.global.response.CustomResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comments")
@Tag(name = "Comment", description = "댓글 API")
public class CommentController {
	private final CommentService commentService;

	@PostMapping()
	@Operation(summary = "댓글을 등록합니다.", description = "댓글의 내용, 게시글의 id값 대댓글인 경우 부모댓글의 id를 파라미터로 받습니다.")
	ResponseEntity<CustomResponse<CommentResponse>> commentAdd(@Valid @RequestBody CommentRequest commentRequest) {
		CommentResponse commentResponse = commentService.addComment(commentRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "댓글 등록 성공", commentResponse));
	}

	@PatchMapping()
	@Operation(summary = "댓글을 수정합니다.", description = "댓글의 id값과 내용을 파라미터로 받습니다.")
	ResponseEntity<CustomResponse<CommentResponse>> commentModify(
		@Valid @RequestBody CommentUpdateRequest commentRequest) {
		CommentResponse commentResponse = commentService.modifyComment(commentRequest);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "댓글 수정 성공", commentResponse));
	}
}
