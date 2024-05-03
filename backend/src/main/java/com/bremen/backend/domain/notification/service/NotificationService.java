package com.bremen.backend.domain.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.user.entity.User;

public interface NotificationService {
	void followNotificationCreate(User follow, User follower);
	SseEmitter subscribe();
	void sendNotification(String userId, String notification);
}
