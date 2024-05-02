package com.bremen.backend.domain.video.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Video;

@Mapper
public interface VideoMapper {
	VideoMapper INSTANCE = Mappers.getMapper(VideoMapper.class);

	VideoResponse videoToVideoResponse(Video video);
}
