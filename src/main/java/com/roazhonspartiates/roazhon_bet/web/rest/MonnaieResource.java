package com.roazhonspartiates.roazhon_bet.web.rest;

import com.roazhonspartiates.roazhon_bet.domain.Monnaie;
import com.roazhonspartiates.roazhon_bet.repository.MonnaieRepository;
import com.roazhonspartiates.roazhon_bet.repository.UserRepository;
import com.roazhonspartiates.roazhon_bet.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link com.roazhonspartiates.roazhon_bet.domain.Monnaie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MonnaieResource {

    private final Logger log = LoggerFactory.getLogger(MonnaieResource.class);

    private static final String ENTITY_NAME = "monnaie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MonnaieRepository monnaieRepository;

    private final UserRepository userRepository;

    public MonnaieResource(MonnaieRepository monnaieRepository, UserRepository userRepository) {
        this.monnaieRepository = monnaieRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /monnaies} : Create a new monnaie.
     *
     * @param monnaie the monnaie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new monnaie, or with status {@code 400 (Bad Request)} if the monnaie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/monnaies")
    public ResponseEntity<Monnaie> createMonnaie(@RequestBody Monnaie monnaie) throws URISyntaxException {
        log.debug("REST request to save Monnaie : {}", monnaie);
        if (monnaie.getId() != null) {
            throw new BadRequestAlertException("A new monnaie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(monnaie.getUser())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        String userId = monnaie.getUser().getId();
        userRepository.findById(userId).ifPresent(monnaie::user);
        Monnaie result = monnaieRepository.save(monnaie);
        return ResponseEntity.created(new URI("/api/monnaies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /monnaies} : Updates an existing monnaie.
     *
     * @param monnaie the monnaie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monnaie,
     * or with status {@code 400 (Bad Request)} if the monnaie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the monnaie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/monnaies")
    public ResponseEntity<Monnaie> updateMonnaie(@RequestBody Monnaie monnaie) throws URISyntaxException {
        log.debug("REST request to update Monnaie : {}", monnaie);
        if (monnaie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Monnaie result = monnaieRepository.save(monnaie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monnaie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /monnaies} : get all the monnaies.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of monnaies in body.
     */
    @GetMapping("/monnaies")
    @Transactional(readOnly = true)
    public List<Monnaie> getAllMonnaies() {
        log.debug("REST request to get all Monnaies");
        return monnaieRepository.findAll();
    }

    /**
     * {@code GET  /monnaies/:id} : get the "id" monnaie.
     *
     * @param id the id of the monnaie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the monnaie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/monnaies/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Monnaie> getMonnaie(@PathVariable String id) {
        log.debug("REST request to get Monnaie : {}", id);
        Optional<Monnaie> monnaie = monnaieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(monnaie);
    }

    /**
     * {@code DELETE  /monnaies/:id} : delete the "id" monnaie.
     *
     * @param id the id of the monnaie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/monnaies/{id}")
    public ResponseEntity<Void> deleteMonnaie(@PathVariable String id) {
        log.debug("REST request to delete Monnaie : {}", id);
        monnaieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
