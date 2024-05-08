package com.bremen.backend.domain.video.service;

import org.springframework.stereotype.Service;

import com.bremen.backend.domain.video.entity.Instrument;
import com.bremen.backend.domain.video.repository.InstrumentRepository;
import com.bremen.backend.global.CustomException;
import com.bremen.backend.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InstrumentServiceImpl implements InstrumentService {
	private final InstrumentRepository instrumentRepository;

	public Instrument getInstrumentById(Long id) {
		return instrumentRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_INSTRUMENT));
	}
}
