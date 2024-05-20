package com.bremen.backend.domain.article.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.video.entity.Video;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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

	@NotNull
	@Setter(AccessLevel.PROTECTED)
	@Column(name = "title", length = 100)
	private String title;

	@Column(name = "content")
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private String content;

	@ColumnDefault("0")
	@Column(name = "hit_cnt")
	@Setter(AccessLevel.PROTECTED)
	private int hitCnt;

	@ColumnDefault("0")
	@Column(name = "like_cnt")
	@Setter(AccessLevel.PROTECTED)
	private int likeCnt;

	@NotNull
	@ColumnDefault("false")
	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
	@Setter(AccessLevel.PROTECTED)
	private boolean isDeleted;

	@NotNull
	@ColumnDefault("false")
	@Column(name = "is_challenge", columnDefinition = "TINYINT(1)")
	@Setter(AccessLevel.PROTECTED)
	private boolean isChallenge;

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
	private User user;

	@JoinColumn(name = "video_id")
	@OneToOne(fetch = FetchType.LAZY, optional = true)
	private Video video;

	public void saveArticle(User user, Video video) {
		this.user = user;
		this.video = video;
	}

	public void modifyArticle(String title, String content) {
		setTitle(title);
		setContent(content);
	}

	public void deleteArticle() {
		this.setDeleted(true);
		this.setDeleteTime(LocalDateTime.now());
	}

	public void viewArticle() {
		setHitCnt(this.hitCnt + 1);
	}

	public void likeArticle() {
		setLikeCnt(this.likeCnt + 1);
	}

	public void unlikeArticle() {
		if (this.likeCnt > 0) {
			this.setLikeCnt(this.likeCnt - 1);
		}
	}
}
