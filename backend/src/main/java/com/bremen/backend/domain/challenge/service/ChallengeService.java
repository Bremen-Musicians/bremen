package com.bremen.backend.domain.challenge.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.bremen.backend.domain.article.dto.ArticleListResponse;
import com.bremen.backend.domain.challenge.dto.ChallengeArticleResponse;
import com.bremen.backend.domain.challenge.dto.ChallengeRequest;
import com.bremen.backend.domain.challenge.dto.ChallengeResponse;
import com.bremen.backend.domain.challenge.entity.Challenge;

public interface ChallengeService {
	Challenge getChallengeById(Long id);

	ChallengeResponse addChallenge(ChallengeRequest challengeRequest, MultipartFile mainImage,
		MultipartFile challengeImage) throws
		IOException;

	ChallengeResponse modifyChallenge(Long id, MultipartFile mainImage, MultipartFile challengeImage) throws
		IOException;

	Long removeChallenge(Long id);

	ChallengeResponse findLatestChallenge();

	Page<ChallengeArticleResponse> findChallengeEnsemble(Pageable pageable);

	Page<ArticleListResponse> findChallengeArticle(Long instrumentId, Pageable pageable);

	List<ArticleListResponse> findChallengeWinner();
}
