package com.bremen.backend.domain.notification;

import com.bremen.backend.domain.notification.entity.NotificationType;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NotificationDto {
	private String content;
	private NotificationType type;
}
