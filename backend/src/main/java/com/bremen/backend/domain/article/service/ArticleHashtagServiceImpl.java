package com.bremen.backend.domain.article.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.dto.HashTagResponse;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.ArticleHashtag;
import com.bremen.backend.domain.article.entity.Hashtag;
import com.bremen.backend.domain.article.mapper.HashtagMapper;
import com.bremen.backend.domain.article.repository.ArticleHashtagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleHashtagServiceImpl implements ArticleHashtagService {
	private final ArticleHashtagRepository articleHashtagRepository;
	private final HashtagService hashtagService;

	@Override
	@Transactional
	public List<HashTagResponse> addHashtags(Article article, Set<String> hashtags) {
		return addArticleHashtags(article, hashtags).stream()
			.map(HashtagMapper.INSTANCE::articlehashtagToHashTagResponse)
			.collect(
				Collectors.toList());
	}

	private ArticleHashtag findOrAddArticleHashtag(Article article, Hashtag hashtag) {
		ArticleHashtag articleHashtag = articleHashtagRepository.findByArticleAndHashtag(article, hashtag)
			.orElse(ArticleHashtag.builder().article(article).hashtag(hashtag).build());
		return articleHashtagRepository.save(articleHashtag);
	}

	private Set<ArticleHashtag> addArticleHashtags(Article article, Set<String> hashtags) {
		return hashtags.stream().map(name -> {
			Hashtag hashtag = hashtagService.findOrAddHashtag(name);
			return findOrAddArticleHashtag(article, hashtag);
		}).collect(Collectors.toSet());
	}
}
