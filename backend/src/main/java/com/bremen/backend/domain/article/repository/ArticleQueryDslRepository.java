package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.user.entity.QFollow.*;
import static com.bremen.backend.domain.user.entity.QUser.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.QArticle;
import com.bremen.backend.domain.user.entity.QFollow;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ArticleQueryDslRepository {
	private final JPAQueryFactory queryFactory;

	public Page<Article> findArticle(Long userId, ArticleOrderBy orderBy, LocalDateTime timeConstraint,
		Pageable pageable) {
		// 팔로우한 유저들의 아이디 조회
		QArticle qArticle = article;
		QFollow qFollow = follow1;

		BooleanExpression isFollowing = userId != null
			? qArticle.user.id.in(
			JPAExpressions
				.selectFrom(qFollow)
				.where(qFollow.follower.id.eq(userId))
				.select(qFollow.follow.id)
		)
			: null;

		JPQLQuery<Article> query = queryFactory
			.selectFrom(qArticle)
			.join(qArticle.user, user).fetchJoin()
			.where(
				isFollowing,
				qArticle.isDeleted.isFalse(),
				qArticle.createTime.goe(timeConstraint)
			)
			.orderBy(orderBy.getOrderSpecifier(qArticle).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}

	public Page<Article> findArticle(ArticleOrderBy orderBy, LocalDateTime timeConstraint, Pageable pageable) {
		QArticle qArticle = article;

		JPQLQuery<Article> query = queryFactory
			.selectFrom(qArticle)
			.where(
				qArticle.isDeleted.isFalse(),
				qArticle.createTime.goe(timeConstraint)
			)
			.orderBy(orderBy.getOrderSpecifier(qArticle).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}

}
