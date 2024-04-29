package com.bremen.backend.domain.article.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bremen.backend.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "article")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Article {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", length = 100)
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private String title;

	@Column(name = "content")
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private String content;

	@Column(name = "hit_cnt")
	@ColumnDefault("0")
	private int hitCnt;

	@Column(name = "like_cnt")
	@ColumnDefault("0")
	private int likeCnt;

	@NotNull
	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
	@ColumnDefault("false")
	@Setter(AccessLevel.PROTECTED)
	private boolean isDeleted;

	@CreationTimestamp
	@Column(name = "create_time")
	private LocalDateTime createTime;

	@Setter(AccessLevel.PROTECTED)
	@Column(name = "delete_time")
	private LocalDateTime deleteTime;

	@UpdateTimestamp
	@Column(name = "update_time")
	private LocalDateTime updateTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private User user;
}
