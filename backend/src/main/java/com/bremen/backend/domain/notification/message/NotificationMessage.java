package com.bremen.backend.domain.notification.message;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class NotificationMessage {
	private String username;
	private String message;
}
