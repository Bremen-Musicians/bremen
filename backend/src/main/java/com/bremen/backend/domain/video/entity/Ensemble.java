package com.bremen.backend.domain.video.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ensemble")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Ensemble {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// @JoinColumn(name = "owner_id");
	private Video owner;

	// @JoinColumn(name = "participant_id")
	private Video participant;
}
