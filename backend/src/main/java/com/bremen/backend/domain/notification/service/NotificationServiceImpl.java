package com.bremen.backend.domain.notification.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.notification.message.FollowNotificationMessage;
import com.bremen.backend.domain.notification.message.NotificationMessage;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
	private final KafkaTemplate<String, NotificationMessage> kafkaTemplate;
	private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
	private final UserService userService;

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
	public SseEmitter subscribe() {
		User user = userService.getUserByToken();
		SseEmitter emitter = new SseEmitter();
		emitters.put(user.getUsername(), emitter);
		emitter.onCompletion(() -> emitters.remove(user.getUsername()));
		emitter.onTimeout(() -> emitters.remove(user.getUsername()));
		return emitter;
	}

	public void sendNotification(String username, String notification) {
		SseEmitter emitter = emitters.get(username);
		if (emitter != null) {
			try {
				emitter.send(SseEmitter.event().data(notification));
			} catch (IOException e) {
				emitters.remove(username);
			}
		}
	}
}
