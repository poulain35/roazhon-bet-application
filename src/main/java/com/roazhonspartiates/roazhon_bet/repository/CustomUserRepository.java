package com.roazhonspartiates.roazhon_bet.repository;
import com.roazhonspartiates.roazhon_bet.domain.CustomUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomUserRepository extends JpaRepository<CustomUser, Long> {

}
