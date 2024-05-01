package com.bremen.backend.domain.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.user.dto.UserReissueResponse;
import com.bremen.backend.domain.user.entity.Token;

@Mapper
public interface TokenMapper {
	TokenMapper INSTANCE = Mappers.getMapper(TokenMapper.class);
	UserReissueResponse tokenToUserReissue(Token token);
}
