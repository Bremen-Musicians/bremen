package com.bremen.backend.domain.video.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.video.entity.Music;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {
	List<Music> findByTitleContaining(String keyword);
}
