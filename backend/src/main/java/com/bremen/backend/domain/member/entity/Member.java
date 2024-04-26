package com.bremen.backend.domain.member.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bremen.backend.domain.member.dto.MemberUpdateRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "member")
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Member {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(unique = true)
	private String username;

	@Setter(AccessLevel.PROTECTED)
	private String password;

	@Setter(AccessLevel.PROTECTED)
	private String introduce;

	@NotNull
	@Column(unique = true)
	@Setter(AccessLevel.PROTECTED)
	private String nickname;

	@Setter(AccessLevel.PROTECTED)
	private String profileImage;

	@ColumnDefault("0")
	private int followerCnt;

	@ColumnDefault("0")
	private int followCnt;

	@ColumnDefault("false")
	@NotNull
	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
	private boolean isDeleted;

	@CreationTimestamp
	private LocalDateTime createTime;
	@UpdateTimestamp
	private LocalDateTime deleteTime;
	@UpdateTimestamp
	private LocalDateTime updateTime;

	public void modifyPassword(String password) {
		this.password = password;
	}

	public void modifyUserInformation(MemberUpdateRequest memberUpdateRequest) {
		this.profileImage = memberUpdateRequest.getProfileImage();
		this.introduce = memberUpdateRequest.getIntroduce();
		this.nickname = memberUpdateRequest.getNickname();
	}

	public void deleteUser() {
		this.deleteTime = LocalDateTime.now();
		this.isDeleted = true;
	}
}
