package com.bremen.backend.domain.article.repository;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.bremen.backend.domain.article.entity.Article;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ArticleQueryRepository {
	private final EntityManager em;

	public List<Article> findEnsembleArticle(Long musicId, List<Long> instrumentIds, String category, String keyword) {
		StringBuilder jpql = new StringBuilder();
		jpql.append("SELECT DISTINCT a FROM Article a ");
		jpql.append("JOIN FETCH a.user u JOIN FETCH a.video v JOIN FETCH v.music m ");
		jpql.append("WHERE m.id = :musicId ");

		if (instrumentIds != null) {
			jpql.append("AND v.instrument.id in (:instrumentIds) ");
		}
		
		if (StringUtils.hasText(category)) {
			switch (category) {
				case "title":
					jpql.append("AND a.title LIKE :keyword ");
					break;
				case "user":
					jpql.append("AND u.nickname LIKE :keyword ");
					break;
			}
		}
		jpql.append("ORDER BY a.createTime DESC");

		TypedQuery<Article> query = em.createQuery(jpql.toString(), Article.class);

		query.setParameter("musicId", musicId);

		if (instrumentIds != null) {
			query.setParameter("instrumentIds", instrumentIds);
		}

		if (StringUtils.hasText(category)) {
			query.setParameter("keyword", "%" + keyword + "%");
		}

		return query.getResultList();
	}
}
