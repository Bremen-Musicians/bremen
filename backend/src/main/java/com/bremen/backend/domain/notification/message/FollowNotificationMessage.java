package com.bremen.backend.domain.notification.message;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class FollowNotificationMessage extends NotificationMessage {
	private String followerUsername;
}
