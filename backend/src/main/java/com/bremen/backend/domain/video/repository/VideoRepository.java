package com.bremen.backend.domain.video.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.video.entity.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
	@Query("SELECT v FROM Video v WHERE v.id = :id AND v.isDeleted = false ")
	Optional<Video> findById(@Param("id") Long id);
}
