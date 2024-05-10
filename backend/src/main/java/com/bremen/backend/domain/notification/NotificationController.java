package com.bremen.backend.domain.notification;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.notification.service.NotificationService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Tag(name = "Notification", description = "알림 API")
public class NotificationController {
	private final NotificationService notificationService;

	@GetMapping(value = "/connect", produces = "text/event-stream")
	public ResponseEntity<SseEmitter> getNotifications() throws IOException {
		ResponseEntity<SseEmitter> response = ResponseEntity.ok()
			.header("X-Accel-Buffering", "no")
			.body(notificationService.subscribe());
		return response;
	}

}
