package com.bremen.backend.domain.article.repository;

import java.util.ArrayList;
import java.util.List;

import com.bremen.backend.domain.article.entity.QArticle;
import com.querydsl.core.types.OrderSpecifier;

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
			list.add(qArticle.likeCnt.desc());
			list.add(qArticle.hitCnt.desc());
			list.add(qArticle.createTime.desc());
			return list;
		}
	};

	public abstract List<OrderSpecifier> getOrderSpecifier(QArticle qArticle);
}
