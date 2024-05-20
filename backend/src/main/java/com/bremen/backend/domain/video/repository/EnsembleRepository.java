package com.bremen.backend.domain.video.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.video.entity.Ensemble;
import com.bremen.backend.domain.video.entity.Video;

@Repository
public interface EnsembleRepository extends JpaRepository<Ensemble, Long> {

	@Query("SELECT e from Ensemble e where e.owner = :videoId")
	List<Ensemble> findByOwner(Long videoId);

	@Query("SELECT e FROM Ensemble e WHERE e.owner = :owner")
	List<Ensemble> findByOwnerVideo(@Param("owner") Video owner);
}
