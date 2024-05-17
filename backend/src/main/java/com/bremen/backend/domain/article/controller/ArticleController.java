package com.bremen.backend.domain.article.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bremen.backend.domain.article.dto.ArticleRequest;
import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.dto.ArticleUpdateRequest;
import com.bremen.backend.domain.article.repository.ArticleOrderBy;
import com.bremen.backend.domain.article.service.ArticleLikeService;
import com.bremen.backend.domain.article.service.ArticleService;
import com.bremen.backend.global.response.ListResponse;
import com.bremen.backend.global.response.SingleResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
@Tag(name = "Article", description = "게시글 API")
public class ArticleController {
	private final ArticleService articleService;
	private final ArticleLikeService articleLikeService;

	@GetMapping("/detail")
	@Operation(summary = "게시글 아이디로 게시글을 조회합니다.", description = "게시글의 id값을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<ArticleResponse>> articleDetails(@RequestParam("id") Long id) {
		ArticleResponse articleResponse = articleService.findArticleById(id);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "조회 성공", articleResponse));
	}

	@PostMapping()
	@Operation(summary = "게시글을 등록합니다.", description = "게시글의 제목, 내용, 영상의 id값과 해시태그 목록을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<ArticleResponse>> articleAdd(@Valid @RequestBody ArticleRequest articleRequest) {
		ArticleResponse articleResponse = articleService.addArticle(articleRequest);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "게시글 등록 성공", articleResponse));
	}

	@PatchMapping()
	@Operation(summary = "게시글을 수정합니다.", description = "게시글의 제목, 내용을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<ArticleResponse>> articleModify(
		@Valid @RequestBody ArticleUpdateRequest articleUpdateRequest) {
		ArticleResponse articleResponse = articleService.modifyArticle(articleUpdateRequest);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "게시글 수정 성공", articleResponse));
	}

	@DeleteMapping()
	@Operation(summary = "게시글을 삭제합니다.", description = "게시글의 id값을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<Long>> articleRemove(@RequestParam("id") Long id) {
		Long articleId = articleService.removeArticle(id);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "게시글 삭제 성공", articleId));
	}

	@GetMapping("/ensemble")
	@Operation(summary = "합주할 게시글들을 조회합니다.",
		description = "합주할 곡의 Id값, 악기들의 id, 게시글의 제목(title, keyword), 사용자의 닉네임(user, keyword)을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<List<ArticleResponse>>> getArticles(
		@RequestParam("musicId") Long musicId,
		@RequestParam(value = "instrumentsIds", required = false) List<Long> instrumentsIds,
		@RequestParam(value = "category", required = false) String category,
		@RequestParam(value = "keyword", required = false) String keyword) {
		List<ArticleResponse> articles = articleService.findEnsembleArticles(musicId, instrumentsIds, category,
			keyword);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "조회 성공", articles));
	}

	@PostMapping("/like")
	@Operation(summary = "게시글에 '좋아요/취소'기능을 수행합니다.", description = "게시글의 id값을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<Integer>> toggleArticleLike(@RequestParam(name = "articleId") Long articleId) {
		int likeCnt = articleLikeService.toggleLikeArticle(articleId);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "좋아요/취소 기능 수행", likeCnt));
	}

	@GetMapping()
	@Operation(summary = "유저가 작성한 게시글을 조회합니다", description = "유저의 id값을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<List<ArticleResponse>>> articleListByUser(@RequestParam("userId") Long userId) {
		List<ArticleResponse> articleResponses = articleService.findArticleByUser(userId);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "조회 성공", articleResponses));
	}

	@GetMapping("/feed")
	@Operation(summary = "피드를 조회합니다", description = "로그인을 한 경우 팔로우한 사용자 정보를 이용한 추천 피드를 조회합니다. 기본값은 POPULAR 입니다")
	ResponseEntity<ListResponse> getFeed(@RequestParam(defaultValue = "POPULAR") ArticleOrderBy order,
		Pageable pageable) {
		ListResponse listResponse = articleService.findArticle(order, pageable);
		listResponse.setStatus(HttpStatus.OK.value());
		listResponse.setMessage("피드 조회 성공");
		return ResponseEntity.ok(listResponse);
	}

	@GetMapping("/related")
	@Operation(summary = "연관 게시글을 조회합니다")
	ResponseEntity<ListResponse> getRelatedArticle(@RequestParam("id") Long id, Pageable pageable) {
		ListResponse listResponse = articleService.findRelatedArticle(id, pageable);
		listResponse.setStatus(HttpStatus.OK.value());
		listResponse.setMessage("연관 게시글 조회 성공");
		return ResponseEntity.ok(listResponse);
	}

	@PostMapping("/challenge")
	@Operation(summary = "챌린지 합주 게시글을 등록합니다.", description = "게시글의 제목, 내용, 영상의 id값과 해시태그 목록을 파라미터로 받습니다.")
	ResponseEntity<SingleResponse<ArticleResponse>> challengeEnsembleArticleAdd(
		@Valid @RequestBody ArticleRequest articleRequest) {
		ArticleResponse articleResponse = articleService.addChallengeEnsembleArticle(articleRequest);
		return ResponseEntity.ok(new SingleResponse<>(HttpStatus.OK.value(), "게시글 등록 성공", articleResponse));
	}

}
