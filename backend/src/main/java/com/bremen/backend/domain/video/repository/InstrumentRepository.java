package com.bremen.backend.domain.video.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.video.entity.Instrument;

@Repository
public interface InstrumentRepository extends JpaRepository<Instrument, Long> {
}
