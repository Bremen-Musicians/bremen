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
@Table(name = "comment")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id")
	@Setter(AccessLevel.PROTECTED)
	private Comment group;

	@NotNull
	@Column(name = "content", length = 500)
	private String content;

	@NotNull
	@ColumnDefault("false")
	@Setter(AccessLevel.PROTECTED)
	@Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
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
	@Setter(AccessLevel.PROTECTED)
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private Article article;

	@JoinColumn(name = "member_id")
	@Setter(AccessLevel.PROTECTED)
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private User user;

	public void saveComment(User user, Article article, Comment group) {
		setUser(user);
		setArticle(article);
		setGroup(group);
	}
}
