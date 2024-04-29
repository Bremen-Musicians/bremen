package com.bremen.backend.domain.video.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bremen.backend.domain.article.entity.Article;
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
@Table(name = "video")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Video {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "video_url", length = 2083)
	@Setter(AccessLevel.PROTECTED)
	private String videoUrl;

	@Column(name = "image_url", length = 2083)
	@Setter(AccessLevel.PROTECTED)
	private String imageUrl;

	@Column(name = "start_time")
	private int startTime;

	@NotNull
	@Column(name = "is_highlight", columnDefinition = "TINYINT(1)")
	@ColumnDefault("false")
	private boolean isHighlight;

	@NotNull
	@Column(name = "is_ensemble", columnDefinition = "TINYINT(1)")
	@ColumnDefault("false")
	private boolean isEnsemble;

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
	@JoinColumn(name = "article_id")
	private Article article;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "music_id")
	private Music music;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "instrument_id")
	private Instrument instrument;

}
