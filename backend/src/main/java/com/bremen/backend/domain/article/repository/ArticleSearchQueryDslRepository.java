package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.user.entity.QUser.*;
import static com.bremen.backend.domain.video.entity.QMusic.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ArticleSearchQueryDslRepository {
	private final JPAQueryFactory queryFactory;

	public Page<Article> searchAll(String category, ArticleOrderBy order, List<Long> instrumentIds, String keyword,
		Pageable pageable) {

		JPQLQuery<Article> query = queryFactory
			.selectFrom(article)
			.join(article.user, user).fetchJoin()
			.where(
				eqInstruments(instrumentIds),
				eqMusicTitle(category, keyword),
				eqTitle(category, keyword),
				eqMusicArtist(category, keyword),
				eqWriter(category, keyword)
			)
			.orderBy(order.getOrderSpecifier(article).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}

	private BooleanExpression eqMusicTitle(String category, String keyword) {
		if (category.equals("music")) {
			return article.video.music.id.in(JPAExpressions
				.selectFrom(music)
				.where(music.title.contains(keyword))
				.select(music.id));
		}
		return null;
	}

	private BooleanExpression eqTitle(String category, String keyword) {
		return category.equals("title") ? article.title.contains(keyword) : null;
	}

	private BooleanExpression eqMusicArtist(String category, String keyword) {
		if (category.equals("artist")) {
			return article.video.music.id.in(
				JPAExpressions.selectFrom(music)
					.where(
						music.composer.contains(keyword)
							.or(music.singer.contains(keyword))
					)
					.select(music.id));
		}
		return null;
	}

	private BooleanExpression eqWriter(String category, String keyword) {
		if (category.equals("writer")) {
			return article.user.id.in(
				JPAExpressions.selectFrom(user)
					.where(user.nickname.contains(keyword))
					.select(user.id));
		}
		return null;
	}

	private BooleanExpression eqInstruments(List<Long> instrumentIds) {
		if (instrumentIds != null) {
			return article.video.instrument.id.in(instrumentIds);
		}
		return null;
	}
}
