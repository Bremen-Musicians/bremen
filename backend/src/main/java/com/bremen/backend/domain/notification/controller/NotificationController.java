package com.bremen.backend.domain.notification.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
public class NotificationController {
	private final NotificationService emitterService;

	@GetMapping("/subscribe")
	public SseEmitter subscribe(Authentication authentication) {
		return emitterService.connectAlarm(authentication.getPrincipal().toString());
	}

}
