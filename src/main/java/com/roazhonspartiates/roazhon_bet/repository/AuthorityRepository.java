package com.roazhonspartiates.roazhon_bet.repository;

import com.roazhonspartiates.roazhon_bet.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
