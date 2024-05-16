package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.article.repository.ArticleOrderBy.*;
import static com.bremen.backend.domain.challenge.entity.QChallengeArticle.*;
import static com.bremen.backend.domain.user.entity.QUser.*;
import static com.bremen.backend.domain.video.entity.QVideo.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ArticleChallengeQueryDslRepository {
	private final JPAQueryFactory queryFactory;

	public Page<Article> findChallengeArticle(Long challengeId, Long instrumentId, Pageable pageable) {
		JPQLQuery<Article> query = queryFactory
			.selectFrom(article)
			.join(article.video, video).fetchJoin()
			.join(article.user, user).fetchJoin()
			.join(challengeArticle).on(article.id.eq(challengeArticle.article.id))
			.where(
				challengeArticle.challenge.id.eq(challengeId),
				instrumentId != null ? article.video.instrument.id.eq(instrumentId) : null,
				article.isDeleted.isFalse()
			)
			.orderBy(POPULAR.getOrderSpecifier(article).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}

	public List<Article> findChallengeWinnerArticle(Long challengeId) {

		NumberExpression<Integer> popularValue = article.likeCnt.add(article.hitCnt.multiply(0.1));

		List<Tuple> subQuery = queryFactory
			.select(video.instrument.id, popularValue.max())
			.from(article)
			.join(article.video, video)
			.join(challengeArticle).on(article.eq(challengeArticle.article))
			.where(challengeArticle.challenge.id.eq(challengeId))
			.groupBy(video.instrument)
			.fetch();

		Map<Long, Integer> instrumentMaxPopularValues = subQuery.stream()
			.collect(Collectors.toMap(
				tuple -> tuple.get(video.instrument.id),
				tuple -> tuple.get(popularValue.max())
			));

		JPQLQuery<Article> query = queryFactory
			.selectFrom(article)
			.join(article.video, video)
			.join(article.user, user)
			.join(challengeArticle).on(article.eq(challengeArticle.article))
			.where(challengeArticle.challenge.id.eq(challengeId)
				.and(video.instrument.id.in(instrumentMaxPopularValues.keySet()))
				.and(popularValue.in(instrumentMaxPopularValues.values()))
			);

		return query.fetch();
	}
}
