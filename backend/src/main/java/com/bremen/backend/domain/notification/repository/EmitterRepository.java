package com.bremen.backend.domain.notification.repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class EmitterRepository {

	private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

	public SseEmitter save(String username, SseEmitter sseEmitter) {
		if (emitterMap.containsKey(username)) {
			emitterMap.remove(username);
		}
		emitterMap.put(username, sseEmitter);

		log.info("[SseEmitter] Set {}", username);
		return sseEmitter;
	}

	public Optional<SseEmitter> get(String username) {
		SseEmitter sseEmitter = emitterMap.get(username);

		log.info("[SseEmitter] Get {}", username);
		return Optional.ofNullable(sseEmitter);
	}

	public void delete(String username) {
		emitterMap.remove(username);
	}
}
