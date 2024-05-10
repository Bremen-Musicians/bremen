package com.bremen.backend.domain.notification.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.bremen.backend.domain.notification.message.FollowNotificationMessage;
import com.bremen.backend.domain.notification.message.NotificationMessage;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.service.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

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

		kafkaTemplate.send("alarm", notificationMessage);

	}

	public SseEmitter subscribe() throws IOException {
		User user = userService.getUserByToken();
		SseEmitter emitter = new SseEmitter();
		emitters.put(user.getUsername(), emitter);
		emitter.onCompletion(() -> emitters.remove(user.getUsername()));
		emitter.onTimeout(() -> emitters.remove(user.getUsername()));

		emitter.send(SseEmitter.event()
			.name("connect")
			.data("connected!"));

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

	@KafkaListener(topics = "alarm", groupId = "consumer")
	public void receiveNotification(String json) {
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(json, JsonObject.class);

		// JSON에 있는 필드를 확인하여 적절한 서브클래스로 변환
		if (jsonObject.has("followerUsername")) {
			FollowNotificationMessage notification = gson.fromJson(json, FollowNotificationMessage.class);
			sendNotification(notification.getUsername(), notification.getMessage());
			// FollowNotification 객체로 처리
		}
	}

}
