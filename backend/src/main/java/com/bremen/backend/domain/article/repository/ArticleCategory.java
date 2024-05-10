package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.user.entity.QUser.*;
import static com.bremen.backend.domain.video.entity.QMusic.*;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;

public enum ArticleCategory {
	ALL {
		public BooleanExpression getCategorySpecifier(String keyword) {
			return MUSIC.getCategorySpecifier(keyword)
				.or(TITLE.getCategorySpecifier(keyword))
				.or(ARTIST.getCategorySpecifier(keyword))
				.or(WRITER.getCategorySpecifier(keyword));
		}
	},
	MUSIC {
		public BooleanExpression getCategorySpecifier(String keyword) {
			return article.video.music.id.in(JPAExpressions
				.selectFrom(music)
				.where(music.title.contains(keyword))
				.select(music.id));
		}
	},
	TITLE {
		public BooleanExpression getCategorySpecifier(String keyword) {
			return article.title.contains(keyword);
		}
	},
	ARTIST {
		public BooleanExpression getCategorySpecifier(String keyword) {
			return article.video.music.id.in(
				JPAExpressions.selectFrom(music)
					.where(
						music.composer.contains(keyword)
							.or(music.singer.contains(keyword))
					)
					.select(music.id));
		}

	},
	WRITER {
		public BooleanExpression getCategorySpecifier(String keyword) {
			return article.user.id.in(
				JPAExpressions.selectFrom(user)
					.where(user.nickname.contains(keyword))
					.select(user.id));
		}
	};

	public abstract BooleanExpression getCategorySpecifier(String keyword);
}
