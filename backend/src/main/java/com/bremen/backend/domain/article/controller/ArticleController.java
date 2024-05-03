package com.bremen.backend.domain.article.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.service.ArticleService;
import com.bremen.backend.global.response.CustomResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
@Tag(name = "Article", description = "게시글 API")
public class ArticleController {
	private final ArticleService articleService;

	@GetMapping()
	@Operation(summary = "게시글 아이디로 게시글을 조회합니다.", description = "게시글의 id값을 파라미터로 받습니다.")
	ResponseEntity<CustomResponse<ArticleResponse>> articleDetails(@RequestParam("id") Long id) {
		ArticleResponse articleResponse = articleService.findArticleById(id);
		return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK.value(), "조회 성공", articleResponse));
	}
}
