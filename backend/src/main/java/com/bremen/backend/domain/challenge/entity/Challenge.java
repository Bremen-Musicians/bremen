package com.bremen.backend.domain.challenge.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.video.entity.Music;

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

@Table(name = "challenge")
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Setter(AccessLevel.PROTECTED)
	@JoinColumn(name = "music_id")
	@ManyToOne(fetch = FetchType.EAGER)
	private Music music;

	@NotNull
	@Column(name = "start_time")
	private LocalDateTime startTime;

	@NotNull
	@Column(name = "end_time")
	private LocalDateTime endTime;

	@Column(name = "main_image")
	@Setter(AccessLevel.PROTECTED)
	private String mainImage;

	@Column(name = "challenge_image")
	@Setter(AccessLevel.PROTECTED)
	private String challengeImage;

	@NotNull
	@ColumnDefault("false")
	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
	@Setter(AccessLevel.PROTECTED)
	private boolean isDeleted;

	@CreationTimestamp
	@Column(name = "create_time")
	private LocalDateTime createTime;

	@Column(name = "delete_time")
	@Setter(AccessLevel.PROTECTED)
	private LocalDateTime deleteTime;

	@UpdateTimestamp
	@Column(name = "update_time")
	private LocalDateTime updateTime;

	@JoinColumn(name = "article_id")
	@OneToOne(fetch = FetchType.LAZY, optional = true)
	private Article article;

	public void saveChallenge(Music music, String mainImage, String challengeImage) {
		setMusic(music);
		setMainImage(mainImage);
		setChallengeImage(challengeImage);
	}

	public void modifyChallenge(String mainImage, String challengeImage) {
		setMainImage(mainImage);
		setChallengeImage(challengeImage);
	}

	public void deleteChallenge() {
		setMainImage(null);
		setChallengeImage(null);
		setDeleted(true);
		setDeleteTime(LocalDateTime.now());
	}
}
