package com.bremen.backend.domain.notification.service;

import org.springframework.data.domain.Pageable;

import com.bremen.backend.domain.notification.NotificationDto;
import com.bremen.backend.global.response.ListResponse;

public interface NotificationService {
	void addNotification(NotificationDto notification, String username);

	ListResponse getNotification(Pageable pageable);

	void deleteNotification(Long id);
	
}
