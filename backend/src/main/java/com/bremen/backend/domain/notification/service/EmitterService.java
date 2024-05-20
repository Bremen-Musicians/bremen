package com.bremen.backend.domain.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.notification.entity.NotificationType;

public interface EmitterService {
	void send(Long alarmId, String username, String msg, NotificationType type);

	SseEmitter connectAlarm(String username);

	String createAlarmId(String username, Long alarmId);
}
