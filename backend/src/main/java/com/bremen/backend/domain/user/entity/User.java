package com.bremen.backend.domain.user.entity;

import java.time.LocalDateTime;
import java.util.Collection;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bremen.backend.domain.user.dto.UserProfileRequest;
import com.bremen.backend.domain.user.dto.UserUpdateRequest;

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
public class User implements UserDetails {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", unique = true)
	@NotNull
	private String username;

	@Column(name = "password")
	@Setter(AccessLevel.PROTECTED)
	private String password;

	@Column(name = "introduce")
	@Setter(AccessLevel.PROTECTED)
	private String introduce;

	@Column(name = "nickname", unique = true)
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private String nickname;

	@Column(name = "profile_image")
	@Setter(AccessLevel.PROTECTED)
	private String profileImage;

	@Column(name = "follower_cnt")
	@ColumnDefault("0")
	private int followerCnt;

	@Column(name = "follow_cnt")
	@ColumnDefault("0")
	private int followCnt;

	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
	@ColumnDefault("false")
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private boolean isDeleted;

	@Column(name = "is_agree", columnDefinition = "TINYINT(1)")
	@ColumnDefault("false")
	@NotNull
	@Setter(AccessLevel.PROTECTED)
	private boolean isAgree;

	@Column(name = "create_time")
	@CreationTimestamp
	private LocalDateTime createTime;

	@Column(name = "delete_time")
	@Setter(AccessLevel.PROTECTED)
	private LocalDateTime deleteTime;

	@Column(name = "update_time")
	@UpdateTimestamp
	private LocalDateTime updateTime;

	public void modifyPassword(String password) {
		this.password = password;
	}

	public void modifyUserInformation(UserUpdateRequest userUpdateRequest) {
		this.setProfileImage(userUpdateRequest.getProfileImage());
		this.setIntroduce(userUpdateRequest.getIntroduce());
		this.setNickname(userUpdateRequest.getNickname());
	}

	public void modifyUserProfile(UserProfileRequest userProfileRequest) {
		this.setProfileImage(userProfileRequest.getProfileImage());
		this.setIntroduce(userProfileRequest.getIntroduce());
	}

	public void deleteUser() {
		this.setDeleted(true);
		this.setDeleteTime(LocalDateTime.now());
	}

	public void agreeUser() {
		this.setAgree(true);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}
}
