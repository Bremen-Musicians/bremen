package com.bremen.backend.domain.challenge.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.article.entity.Article;
import com.bremen.backend.domain.challenge.entity.Challenge;
import com.bremen.backend.domain.challenge.entity.ChallengeArticle;
import com.bremen.backend.domain.challenge.repository.ChallengeArticleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChallengeArticleServiceImpl implements ChallengeArticleService {
	private final ChallengeService challengeService;
	private final ChallengeArticleRepository challengeArticleRepository;

	@Override
	public void addChallengeArticle(Article article) {
		//최신 챌린지만 추가합니다.
		Challenge challenge = challengeService.findLatestChallenge();
		ChallengeArticle challengeArticle = ChallengeArticle.builder()
			.article(article)
			.challenge(challenge)
			.build();
		challengeArticleRepository.save(challengeArticle);
	}
}
