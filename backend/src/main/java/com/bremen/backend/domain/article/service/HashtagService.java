package com.bremen.backend.domain.article.service;

import java.util.List;

import com.bremen.backend.domain.article.entity.Hashtag;

public interface HashtagService {
	Hashtag findOrAddHashtag(String name);

	int removeHashtags(List<Hashtag> hashtags);
}
