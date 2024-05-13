package com.bremen.backend.domain.notification.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.notification.NotificationDto;
import com.bremen.backend.domain.notification.entity.Notification;
import com.bremen.backend.domain.notification.mapper.NotificationMapper;
import com.bremen.backend.domain.notification.repository.NotificationRepository;
import com.bremen.backend.domain.user.service.UserService;
import com.bremen.backend.global.response.ListResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
	private final NotificationRepository notificationRepository;
	private final UserService userService;

	@Override
	@Transactional
	public void addNotification(NotificationDto notificationDto, String username) {
		Notification notification = NotificationMapper.INSTANCE.dtoToEntity(notificationDto);
		notification.addUser(userService.getUserByUsername(username));
		notificationRepository.save(notification);
	}

	@Override
	@Transactional(readOnly = true)
	public ListResponse getNotification(Pageable pageable) {
		String username = userService.getUserByToken().getUsername();
		Page<Notification> pages = notificationRepository.findByUser(username, pageable);
		List<NotificationDto> notificationDtos = pages.getContent()
			.stream()
			.map(NotificationMapper.INSTANCE::entityToDto)
			.collect(Collectors.toList());
		return new ListResponse<>(notificationDtos, pages.getTotalElements(), pages.getPageable());
	}
}
