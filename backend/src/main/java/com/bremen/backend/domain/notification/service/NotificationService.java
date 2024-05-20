package com.bremen.backend.domain.notification.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.bremen.backend.domain.notification.NotificationDto;
import com.bremen.backend.global.response.ListResponse;

public interface NotificationService {
	void addNotification(NotificationDto notification, String username);

	ListResponse getNotification(Pageable pageable);

	Long deleteNotification(ArrayList<Long> ids);
	
}
