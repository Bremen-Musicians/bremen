package com.bremen.backend.domain.member.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "member")
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	@Column(unique = true)
	private String username;
	private String introduce;
	@NotNull
	private String nickname;
	private String profileImage;
	@ColumnDefault("0")
	private int followerCnt;

	@ColumnDefault("0")
	private int followCnt;

	@ColumnDefault("false")
	@NotNull
	@Column(name = "deleted", columnDefinition = "TINYINT(1)")
	private boolean isDeleted;

	@CreationTimestamp
	private LocalDateTime createTime;
	@UpdateTimestamp
	private LocalDateTime deleteTime;
	@UpdateTimestamp
	private LocalDateTime updateTime;
}
