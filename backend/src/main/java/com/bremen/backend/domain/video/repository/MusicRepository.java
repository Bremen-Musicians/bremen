package com.bremen.backend.domain.video.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.video.entity.Music;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {
	Page<Music> findByTitleContaining(String title, Pageable pageable);
}
