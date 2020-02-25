package com.roazhonspartiates.roazhon_bet.repository;
import com.roazhonspartiates.roazhon_bet.domain.Monnaie;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Monnaie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonnaieRepository extends JpaRepository<Monnaie, String> {
    @Query("select monnaie from Monnaie monnaie where monnaie.user.login = ?#{principal.preferredUsername}")
    List<Monnaie> findByUserIsCurrentUser();
}
