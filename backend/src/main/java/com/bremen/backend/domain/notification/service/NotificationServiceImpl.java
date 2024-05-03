package com.bremen.backend.domain.notification.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.bremen.backend.domain.notification.message.FollowNotificationMessage;
import com.bremen.backend.domain.notification.message.NotificationMessage;
import com.bremen.backend.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
	private final KafkaTemplate<String, NotificationMessage> kafkaTemplate;

	@Override
	public void followNotificationCreate(User follow, User follower) {

		log.info("{} 에게 팔로우 알림 전송 ", follow.getUsername());

		String message = follower.getUsername() + "님이 팔로우 하셨습니다.";

		FollowNotificationMessage notificationMessage = FollowNotificationMessage.builder()
			.username(follow.getUsername())
			.followerUsername(follow.getUsername())
			.message(message)
			.build();

		kafkaTemplate.send("alert", notificationMessage);

	}
}
