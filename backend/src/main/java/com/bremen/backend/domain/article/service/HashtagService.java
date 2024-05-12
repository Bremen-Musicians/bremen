package com.bremen.backend.domain.article.service;

import com.bremen.backend.domain.article.entity.Hashtag;

public interface HashtagService {
	Hashtag findOrAddHashtag(String name);
}
