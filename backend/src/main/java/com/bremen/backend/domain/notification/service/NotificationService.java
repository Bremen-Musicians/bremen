package com.bremen.backend.domain.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
	void send(Long alarmId, String username, String msg);

	SseEmitter connectAlarm(String username);

	String createAlarmId(String username, Long alarmId);
}
