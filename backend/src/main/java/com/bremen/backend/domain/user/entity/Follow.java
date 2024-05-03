package com.bremen.backend.domain.user.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "follow")
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Follow {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "follower")
	private User follower;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "follow")
	private User follow;

	@CreationTimestamp
	@Column(name = "create_time")
	private LocalDateTime createTime;

}
