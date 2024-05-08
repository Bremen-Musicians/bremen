package com.bremen.backend.domain.article.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.article.dto.ArticleRequest;
import com.bremen.backend.domain.article.dto.ArticleResponse;
import com.bremen.backend.domain.article.dto.ArticleUpdateRequest;
import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.article.mapper.ArticleMapper;
import com.bremen.backend.domain.article.repository.ArticleQueryRepository;
import com.bremen.backend.domain.article.repository.ArticleRepository;
import com.bremen.backend.domain.user.entity.User;
import com.bremen.backend.domain.user.service.UserService;
import com.bremen.backend.domain.video.service.VideoService;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
	private final ArticleRepository articleRepository;
	private final UserService userService;
	private final VideoService videoService;
	private final ArticleQueryRepository articleQueryRepository;
	private final LikeService likeService;

	@Override
	@Transactional
	public ArticleResponse findArticleById(Long articleId) {
		Article article = getArticleById(articleId);
		article.viewArticle();
		ArticleResponse articleResponse = ArticleMapper.INSTANCE.articleToArticleResponse(article);

		if (userService.isAuthenticated()) {
			Long userId = userService.getUserByToken().getId();
			boolean isLike = likeService.isLikeArticle(userId, articleId);
			articleResponse.setLike(isLike);
		}
		return articleResponse;
	}

	@Override
	public Article getArticleById(Long articleId) {
		return articleRepository.findById(articleId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
	}

	@Override
	@Transactional
	public ArticleResponse addArticle(ArticleRequest articleRequest) {
		Article article = ArticleMapper.INSTANCE.articleRequestToArticle(articleRequest);
		article.saveArticle(userService.getUserByToken(), videoService.getVideoById(articleRequest.getVideoId()));
		Article savedArticle = articleRepository.save(article);
		return ArticleMapper.INSTANCE.articleToArticleResponse(savedArticle);
	}

	@Override
	@Transactional
	public ArticleResponse modifyArticle(ArticleUpdateRequest articleUpdateRequest) {
		Article article = getArticleById(articleUpdateRequest.getId());
		article.modifyArticle(articleUpdateRequest.getTitle(), articleUpdateRequest.getContent());
		return ArticleMapper.INSTANCE.articleToArticleResponse(article);
	}

	@Override
	@Transactional
	public Long removeArticle(Long id) {
		Article article = getArticleById(id);
		User user = userService.getUserByToken();
		if (!article.getUser().getId().equals(user.getId())) {
			throw new CustomException(ErrorCode.UNAUTHORIZED_ARTICLE_ACCESS);
		}
		article.deleteArticle();
		videoService.removeVideo(article.getVideo().getId());
		return article.getId();
	}

	@Override
	public List<ArticleResponse> findEnsembleArticles(Long musicId, List<Long> instrumentsIds, String category,
		String keyword) {
		List<Article> articles = articleQueryRepository.findEnsembleArticle(musicId, instrumentsIds, category, keyword);
		return articles.stream().map(ArticleMapper.INSTANCE::articleToArticleResponse).collect(Collectors.toList());
	}
}
