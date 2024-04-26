package com.bremen.backend.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bremen.backend.domain.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	@Query("SELECT m FROM Member m WHERE m.id = ?1 AND m.isDeleted = false")
	Optional<Member> findById(Long id);
}
