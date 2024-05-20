package com.bremen.backend.domain.article.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.entity.ArticleHashtag;
import com.bremen.backend.domain.article.entity.Hashtag;
import com.bremen.backend.domain.article.repository.ArticleHashtagRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleHashtagServiceImpl implements ArticleHashtagService {
	private final ArticleHashtagRepository articleHashtagRepository;
	private final HashtagService hashtagService;

	@Override
	@Transactional
	public List<String> addHashtags(Article article, Set<String> hashtags) {
		return addArticleHashtags(article, hashtags).stream()
			.map(articleHashtag -> articleHashtag.getHashtag().getName())
			.collect(
				Collectors.toList());
	}

	@Override
	@Transactional
	public List<String> modifyHashtags(Article article, Set<String> hashtags) {
		Set<String> originalHashtags = articleHashtagRepository.findByArticleId(article.getId()).stream()
			.map(ArticleHashtag::getHashtag)
			.map(Hashtag::getName)
			.collect(Collectors.toSet());
		Set<String> modifiedHashtags = new HashSet<>(hashtags);

		Set<String> hashtagsToRemove = new HashSet<>(originalHashtags);
		hashtagsToRemove.removeAll(modifiedHashtags);
		removeHashtags(article.getId(),
			articleHashtagRepository.findByArticleIdAndHashtagNameIn(article.getId(), hashtagsToRemove));

		Set<String> hashtagsToAdd = new HashSet<>(modifiedHashtags);
		hashtagsToAdd.removeAll(originalHashtags);
		addHashtags(article, hashtagsToAdd);

		return new ArrayList<>(modifiedHashtags);
	}

	@Override
	@Transactional
	public int removeHashtags(Long articleId) {
		return removeHashtags(articleId, articleHashtagRepository.findByArticleId(articleId));
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

	private int removeHashtags(Long articleId, List<ArticleHashtag> articleHashtags) {
		List<Hashtag> hashtagsToRemove = articleHashtags.stream()
			.filter(articleHashtag ->
				articleHashtagRepository.findByHashtagAndArticleIdNot(articleHashtag.getHashtag(), articleId).isEmpty())
			.map(ArticleHashtag::getHashtag)
			.collect(Collectors.toList());
		articleHashtagRepository.deleteAll(articleHashtags);
		hashtagService.removeHashtags(hashtagsToRemove);
		return articleHashtags.size();
	}
}
