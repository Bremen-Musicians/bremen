package com.bremen.backend.domain.notification.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.notification.NotificationDto;
import com.bremen.backend.domain.notification.entity.Notification;

@Mapper
public interface NotificationMapper {
	NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);
	Notification dtoToEntity(NotificationDto notificationDto);
	NotificationDto entityToDto(Notification notification);
}
