package com.bremen.backend.domain.article.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bremen.backend.domain.article.entity.Hashtag;
import com.bremen.backend.domain.article.repository.HashtagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HashTagServiceImpl implements HashtagService {
	private final HashtagRepository hashtagRepository;

	@Override
	@Transactional
	public Hashtag findOrAddHashtag(String name) {
		Hashtag hashtag = hashtagRepository.findByName(name).orElse(Hashtag.builder().name(name).build());
		return hashtagRepository.save(hashtag);
	}
}
