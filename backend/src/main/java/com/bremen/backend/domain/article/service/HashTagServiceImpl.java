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
		return hashtagRepository.findByName(name)
			.orElseGet(() -> hashtagRepository.save(Hashtag.builder().name(name).build()));
	}

	@Override
	@Transactional
	public Long removeHashtag(Long id) {
		hashtagRepository.deleteById(id);
		return id;
	}
}
