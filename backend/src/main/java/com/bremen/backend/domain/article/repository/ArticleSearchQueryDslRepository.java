package com.bremen.backend.domain.article.repository;

import static com.bremen.backend.domain.article.entity.QArticle.*;
import static com.bremen.backend.domain.user.entity.QUser.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.bremen.backend.domain.article.entity.Article;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ArticleSearchQueryDslRepository {
	private final JPAQueryFactory queryFactory;

	public Page<Article> searchAll(ArticleCategory category, ArticleOrderBy order, List<Long> instrumentIds,
		String keyword,
		Pageable pageable) {

		JPQLQuery<Article> query = queryFactory
			.selectFrom(article)
			.join(article.user, user).fetchJoin()
			.where(
				instrumentIds != null ? article.video.instrument.id.in(instrumentIds) : null,
				StringUtils.hasText(keyword) ? category.getCategorySpecifier(keyword) : null,
				article.isDeleted.isFalse()
			)
			.orderBy(order.getOrderSpecifier(article).toArray(OrderSpecifier[]::new));

		List<Article> articles = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

		return PageableExecutionUtils.getPage(articles, pageable, query::fetchCount);
	}
}
