package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.article.repository.ArticleOrderBy.*;
import static com.bremen.backend.domain.challenge.entity.QChallengeArticle.*;
import static com.bremen.backend.domain.user.entity.QUser.*;
import static com.bremen.backend.domain.video.entity.QVideo.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.article.entity.Article;
import com.querydsl.core.types.OrderSpecifier;
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
				instrumentId != null ? article.video.instrument.id.eq(instrumentId) : null
			)
			.orderBy(POPULAR.getOrderSpecifier(article).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}
}
