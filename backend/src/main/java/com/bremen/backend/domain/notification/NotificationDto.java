package com.bremen.backend.domain.notification;

import java.time.LocalDateTime;

import com.bremen.backend.domain.notification.entity.NotificationType;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NotificationDto {
	private Long id;
	private String content;
	private NotificationType type;
	private LocalDateTime createTime;
}
