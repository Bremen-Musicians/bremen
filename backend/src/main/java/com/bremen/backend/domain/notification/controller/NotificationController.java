package com.bremen.backend.domain.notification.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.article.repository.ArticleOrderBy;
import com.bremen.backend.domain.notification.service.EmitterService;
import com.bremen.backend.domain.notification.service.NotificationService;
import com.bremen.backend.global.response.ListResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
public class NotificationController {
	private final EmitterService emitterService;
	private final NotificationService notificationService;

	@GetMapping("/subscribe")
	SseEmitter subscribe(Authentication authentication) {
		return emitterService.connectAlarm(authentication.getPrincipal().toString());
	}

	@GetMapping()
	ResponseEntity<ListResponse> getNotification(Pageable pageable){
		ListResponse listResponse = notificationService.getNotification(pageable);
		listResponse.setStatus(HttpStatus.OK.value());
		listResponse.setMessage("알림 조회 성공");
		return ResponseEntity.ok(listResponse);
	}

}
