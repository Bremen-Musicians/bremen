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
				getCategoryExpression(category, keyword)
			)
			.orderBy(order.getOrderSpecifier(article).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}

	private BooleanExpression eqMusicTitle(String keyword) {
		return article.video.music.id.in(JPAExpressions
			.selectFrom(music)
			.where(music.title.contains(keyword))
			.select(music.id));
	}

	private BooleanExpression eqTitle(String keyword) {
		return article.title.contains(keyword);
	}

	private BooleanExpression eqMusicArtist(String keyword) {
		return article.video.music.id.in(
			JPAExpressions.selectFrom(music)
				.where(
					music.composer.contains(keyword)
						.or(music.singer.contains(keyword))
				)
				.select(music.id));
	}

	private BooleanExpression eqWriter(String keyword) {
		return article.user.id.in(
			JPAExpressions.selectFrom(user)
				.where(user.nickname.contains(keyword))
				.select(user.id));
	}

	private BooleanExpression eqInstruments(List<Long> instrumentIds) {
		if (instrumentIds != null) {
			return article.video.instrument.id.in(instrumentIds);
		}
		return null;
	}

	private BooleanExpression getCategoryExpression(String category, String keyword) {
		return switch (category) {
			case "music" -> eqMusicTitle(keyword);
			case "title" -> eqTitle(keyword);
			case "artist" -> eqMusicArtist(keyword);
			case "writer" -> eqWriter(keyword);
			default -> null;
		};
	}
}
