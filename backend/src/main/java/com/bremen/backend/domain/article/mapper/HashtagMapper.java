package com.bremen.backend.domain.article.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.article.dto.HashTagResponse;
import com.bremen.backend.domain.article.entity.ArticleHashtag;

@Mapper
public interface HashtagMapper {
	HashtagMapper INSTANCE = Mappers.getMapper(HashtagMapper.class);

	@Mapping(target = "name", source = "articleHashtag.hashtag.name")
	HashTagResponse articlehashtagToHashTagResponse(ArticleHashtag articleHashtag);
}
