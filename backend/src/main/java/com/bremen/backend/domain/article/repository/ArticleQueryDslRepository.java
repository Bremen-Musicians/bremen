package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.user.entity.QFollow.*;
import static com.bremen.backend.domain.user.entity.QUser.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.QArticle;
import com.bremen.backend.domain.user.entity.QFollow;
import com.bremen.backend.domain.user.entity.QUser;
import com.bremen.backend.domain.video.entity.Video;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ArticleQueryDslRepository {
	private final JPAQueryFactory queryFactory;

	public List<Article> findArticle(Long userId,ArticleOrderBy orderBy, LocalDateTime timeConstraint) {
		// 팔로우한 유저들의 아이디 조회
		QArticle qArticle = article;
		QFollow qFollow = follow1;
		QUser qUser = user;

		BooleanExpression isFollowing = userId != null
			? qArticle.user.id.in(
			JPAExpressions
				.selectFrom(qFollow)
				.where(qFollow.follower.id.eq(userId))
				.select(qFollow.follow.id)
		)
			: null;

		return queryFactory
			.selectFrom(qArticle)
			.join(qArticle.user,qUser).fetchJoin()
			.where(
				isFollowing != null ? isFollowing : null,
				qArticle.isDeleted.isFalse(),
				qArticle.createTime.goe(timeConstraint)
			)
			.orderBy(orderBy.getOrderSpecifier(qArticle).stream().toArray(OrderSpecifier[]::new))
			.fetch();
	}
	public List<Article> findArticle(ArticleOrderBy orderBy,LocalDateTime timeConstraint){
		QArticle qArticle = article;

		return queryFactory
			.selectFrom(qArticle)
			.where(
				qArticle.isDeleted.isFalse(),
				qArticle.createTime.goe(timeConstraint)
			)
			.orderBy(orderBy.getOrderSpecifier(qArticle).stream().toArray(OrderSpecifier[]::new))
			.fetch();
	}


}
