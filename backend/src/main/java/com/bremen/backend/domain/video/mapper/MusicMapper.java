package com.bremen.backend.domain.video.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.video.dto.MusicResponse;
import com.bremen.backend.domain.video.entity.Music;

@Mapper
public interface MusicMapper {
	MusicMapper INSTANCE = Mappers.getMapper(MusicMapper.class);

	MusicResponse musicToMusicResponse(Music music);
}
