package com.bremen.backend.domain.challenge.entity;

import java.time.LocalDateTime;

import com.bremen.backend.domain.video.entity.Music;

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
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "music_id")
	private Music music;

	@NotNull
	@Column(name = "start_time")
	private LocalDateTime startTime;

	@NotNull
	@Column(name = "end_time")
	private LocalDateTime endTime;

	@Setter(AccessLevel.PROTECTED)
	@Column(name = "content", length = 2083)
	private String content;

	public void saveChallenge(Music music) {
		setMusic(music);
	}
}
