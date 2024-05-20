package com.bremen.backend.domain.article.repository;

import java.util.ArrayList;
import java.util.List;

import com.bremen.backend.domain.article.entity.QArticle;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.NumberExpression;

public enum ArticleOrderBy {
	LATEST {
		@Override
		public List<OrderSpecifier> getOrderSpecifier(QArticle qArticle) {
			List<OrderSpecifier> list = new ArrayList<>();
			list.add(qArticle.createTime.desc());
			return list;
		}
	},
	POPULAR {
		@Override
		public List<OrderSpecifier> getOrderSpecifier(QArticle qArticle) {
			List<OrderSpecifier> list = new ArrayList<>();
			NumberExpression<Integer> popularityScore = qArticle.likeCnt.add(qArticle.hitCnt.multiply(0.1));
			list.add(popularityScore.desc());
			list.add(qArticle.createTime.desc());
			return list;
		}
	};

	public abstract List<OrderSpecifier> getOrderSpecifier(QArticle qArticle);
}
