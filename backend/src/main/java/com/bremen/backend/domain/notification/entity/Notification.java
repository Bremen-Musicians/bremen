package com.bremen.backend.domain.notification.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bremen.backend.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notification")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "content")
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private String content;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "type")
	@NotNull
	private NotificationType type;

	@NotNull
	@ColumnDefault("false")
	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
	@Setter(AccessLevel.PROTECTED)
	private boolean isDeleted;

	@NotNull
	@ColumnDefault("false")
	@Column(name = "is_read", columnDefinition = "TINYINT(1)")
	@Setter(AccessLevel.PROTECTED)
	private boolean isRead;

	@CreationTimestamp
	@Column(name = "create_time")
	private LocalDateTime createTime;

	@Column(name = "delete_time")
	@Setter(AccessLevel.PROTECTED)
	private LocalDateTime deleteTime;

	@UpdateTimestamp
	@Column(name = "update_time")
	private LocalDateTime updateTime;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	@Setter(AccessLevel.PROTECTED)
	private User user;

	public void addUser(User user){
		this.setUser(user);
	}

}
