package com.bremen.backend.domain.notification.service;

import java.io.IOException;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.user.entity.User;

public interface NotificationService {
	void followNotificationCreate(User follow, User follower);
	SseEmitter subscribe() throws IOException;
	void sendNotification(String userId, String notification);
	void receiveNotification(String json);
}
