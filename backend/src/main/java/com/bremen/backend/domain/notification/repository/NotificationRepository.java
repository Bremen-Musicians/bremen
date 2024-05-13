package com.bremen.backend.domain.notification.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bremen.backend.domain.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	@Query("SELECT n FROM Notification n where n.user.username =:username and n.isDeleted = false")
	Page<Notification> findByUser(@Param("username") String username, Pageable pageable);
}
