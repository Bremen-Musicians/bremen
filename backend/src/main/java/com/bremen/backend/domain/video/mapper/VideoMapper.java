package com.bremen.backend.domain.video.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.bremen.backend.domain.video.dto.VideoRequest;
import com.bremen.backend.domain.video.dto.VideoResponse;
import com.bremen.backend.domain.video.entity.Video;

@Mapper
public interface VideoMapper {
	VideoMapper INSTANCE = Mappers.getMapper(VideoMapper.class);

	VideoResponse videoToVideoResponse(Video video);

	@Mapping(target = "user.id", source = "videoRequest.userId")
	@Mapping(target = "music.id", source = "videoRequest.musicId")
	@Mapping(target = "instrument.id", source = "videoRequest.instrumentId")
	Video videoRequestToVideo(VideoRequest videoRequest);

	@Mapping(target = "userId", source = "video.user.id")
	@Mapping(target = "musicId", source = "video.music.id")
	@Mapping(target = "instrumentId", source = "video.instrument.id")
	VideoRequest videoToVideoRequest(Video video);
}
