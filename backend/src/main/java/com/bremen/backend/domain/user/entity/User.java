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
	@Setter(AccessLevel.PROTECTED)
	private boolean isDeleted;

	@ColumnDefault("false")
	@NotNull
	@Column(name = "is_agree", columnDefinition = "TINYINT(1)")
	@Setter(AccessLevel.PROTECTED)
	private boolean isAgree;

	@CreationTimestamp
	private LocalDateTime createTime;
	@Setter(AccessLevel.PROTECTED)
	private LocalDateTime deleteTime;
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
