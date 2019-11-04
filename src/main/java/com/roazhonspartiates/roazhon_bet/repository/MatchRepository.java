package com.roazhonspartiates.roazhon_bet.repository;
import com.roazhonspartiates.roazhon_bet.domain.Match;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Match entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

}
