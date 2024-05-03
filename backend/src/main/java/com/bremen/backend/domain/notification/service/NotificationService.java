package com.bremen.backend.domain.notification.service;

import com.bremen.backend.domain.user.entity.User;

public interface NotificationService {
	void followNotificationCreate(User follow, User follower);
}
