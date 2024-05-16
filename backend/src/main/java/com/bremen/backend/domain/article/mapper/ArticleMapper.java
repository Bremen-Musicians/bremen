package com.bremen.backend.domain.article.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.article.dto.ArticleListResponse;
import com.bremen.backend.domain.article.dto.ArticleRequest;
import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.user.mapper.UserMapper;
import com.bremen.backend.domain.video.mapper.VideoMapper;

@Mapper(uses = {UserMapper.class, VideoMapper.class})
public interface ArticleMapper {
	ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

	@Mapping(target = "userId", source = "article.user.id")
	@Mapping(target = "username", source = "article.user.username")
	@Mapping(target = "nickname", source = "article.user.nickname")
	@Mapping(target = "videoId", source = "article.video.id")
	@Mapping(target = "videoUrl", source = "article.video.videoUrl")
	@Mapping(target = "imageUrl", source = "article.video.imageUrl")
	ArticleResponse articleToArticleResponse(Article article);

	@Mapping(target = "video.id", source = "articleRequest.videoId")
	Article articleRequestToArticle(ArticleRequest articleRequest);

	ArticleListResponse articleToArticleListResponse(Article article);
}
