package com.roazhonspartiates.roazhon_bet.web.rest;

import com.roazhonspartiates.roazhon_bet.RoazhonBetApplicationApp;
import com.roazhonspartiates.roazhon_bet.config.TestSecurityConfiguration;
import com.roazhonspartiates.roazhon_bet.domain.Monnaie;
import com.roazhonspartiates.roazhon_bet.domain.User;
import com.roazhonspartiates.roazhon_bet.repository.MonnaieRepository;
import com.roazhonspartiates.roazhon_bet.repository.UserRepository;
import com.roazhonspartiates.roazhon_bet.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static com.roazhonspartiates.roazhon_bet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MonnaieResource} REST controller.
 */
@SpringBootTest(classes = {RoazhonBetApplicationApp.class, TestSecurityConfiguration.class})
public class MonnaieResourceIT {

    private static final Long DEFAULT_TOTAL = 1L;
    private static final Long UPDATED_TOTAL = 2L;

    @Autowired
    private MonnaieRepository monnaieRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMonnaieMockMvc;

    private Monnaie monnaie;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MonnaieResource monnaieResource = new MonnaieResource(monnaieRepository, userRepository);
        this.restMonnaieMockMvc = MockMvcBuilders.standaloneSetup(monnaieResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Monnaie createEntity(EntityManager em) {
        Monnaie monnaie = new Monnaie()
            .total(DEFAULT_TOTAL);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        monnaie.setUser(user);
        return monnaie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Monnaie createUpdatedEntity(EntityManager em) {
        Monnaie monnaie = new Monnaie()
            .total(UPDATED_TOTAL);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        monnaie.setUser(user);
        return monnaie;
    }

    @BeforeEach
    public void initTest() {
        monnaie = createEntity(em);
    }

    @Test
    @Transactional
    public void createMonnaie() throws Exception {
        int databaseSizeBeforeCreate = monnaieRepository.findAll().size();

        // Create the Monnaie
        restMonnaieMockMvc.perform(post("/api/monnaies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monnaie)))
            .andExpect(status().isCreated());

        // Validate the Monnaie in the database
        List<Monnaie> monnaieList = monnaieRepository.findAll();
        assertThat(monnaieList).hasSize(databaseSizeBeforeCreate + 1);
        Monnaie testMonnaie = monnaieList.get(monnaieList.size() - 1);
        assertThat(testMonnaie.getTotal()).isEqualTo(DEFAULT_TOTAL);

        // Validate the id for MapsId, the ids must be same
        assertThat(testMonnaie.getId()).isEqualTo(testMonnaie.getUser().getId());
    }

    @Test
    @Transactional
    public void createMonnaieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = monnaieRepository.findAll().size();

        // Create the Monnaie with an existing ID
        monnaie.setId(UUID.randomUUID().toString());

        // An entity with an existing ID cannot be created, so this API call must fail
        restMonnaieMockMvc.perform(post("/api/monnaies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monnaie)))
            .andExpect(status().isBadRequest());

        // Validate the Monnaie in the database
        List<Monnaie> monnaieList = monnaieRepository.findAll();
        assertThat(monnaieList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateMonnaieMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        monnaieRepository.saveAndFlush(monnaie);
        int databaseSizeBeforeCreate = monnaieRepository.findAll().size();

        // Add a new parent entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();

        // Load the monnaie
        Monnaie updatedMonnaie = monnaieRepository.findById(monnaie.getId()).get();
        // Disconnect from session so that the updates on updatedMonnaie are not directly saved in db
        em.detach(updatedMonnaie);

        // Update the User with new association value
        updatedMonnaie.setUser(user);

        // Update the entity
        restMonnaieMockMvc.perform(put("/api/monnaies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMonnaie)))
            .andExpect(status().isOk());

        // Validate the Monnaie in the database
        List<Monnaie> monnaieList = monnaieRepository.findAll();
        assertThat(monnaieList).hasSize(databaseSizeBeforeCreate);
        Monnaie testMonnaie = monnaieList.get(monnaieList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testMonnaie.getId()).isEqualTo(testMonnaie.getUser().getId());
    }

    @Test
    @Transactional
    public void getAllMonnaies() throws Exception {
        // Initialize the database
        monnaieRepository.saveAndFlush(monnaie);

        // Get all the monnaieList
        restMonnaieMockMvc.perform(get("/api/monnaies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(monnaie.getId())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())));
    }

    @Test
    @Transactional
    public void getMonnaie() throws Exception {
        // Initialize the database
        monnaieRepository.saveAndFlush(monnaie);

        // Get the monnaie
        restMonnaieMockMvc.perform(get("/api/monnaies/{id}", monnaie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(monnaie.getId()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMonnaie() throws Exception {
        // Get the monnaie
        restMonnaieMockMvc.perform(get("/api/monnaies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMonnaie() throws Exception {
        // Initialize the database
        monnaieRepository.saveAndFlush(monnaie);

        int databaseSizeBeforeUpdate = monnaieRepository.findAll().size();

        // Update the monnaie
        Monnaie updatedMonnaie = monnaieRepository.findById(monnaie.getId()).get();
        // Disconnect from session so that the updates on updatedMonnaie are not directly saved in db
        em.detach(updatedMonnaie);
        updatedMonnaie
            .total(UPDATED_TOTAL);

        restMonnaieMockMvc.perform(put("/api/monnaies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMonnaie)))
            .andExpect(status().isOk());

        // Validate the Monnaie in the database
        List<Monnaie> monnaieList = monnaieRepository.findAll();
        assertThat(monnaieList).hasSize(databaseSizeBeforeUpdate);
        Monnaie testMonnaie = monnaieList.get(monnaieList.size() - 1);
        assertThat(testMonnaie.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingMonnaie() throws Exception {
        int databaseSizeBeforeUpdate = monnaieRepository.findAll().size();

        // Create the Monnaie

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMonnaieMockMvc.perform(put("/api/monnaies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monnaie)))
            .andExpect(status().isBadRequest());

        // Validate the Monnaie in the database
        List<Monnaie> monnaieList = monnaieRepository.findAll();
        assertThat(monnaieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMonnaie() throws Exception {
        // Initialize the database
        monnaieRepository.saveAndFlush(monnaie);

        int databaseSizeBeforeDelete = monnaieRepository.findAll().size();

        // Delete the monnaie
        restMonnaieMockMvc.perform(delete("/api/monnaies/{id}", monnaie.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Monnaie> monnaieList = monnaieRepository.findAll();
        assertThat(monnaieList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Monnaie.class);
        Monnaie monnaie1 = new Monnaie();
        monnaie1.setId(UUID.randomUUID().toString());
        Monnaie monnaie2 = new Monnaie();
        monnaie2.setId(monnaie1.getId());
        assertThat(monnaie1).isEqualTo(monnaie2);
        monnaie2.setId(UUID.randomUUID().toString());
        assertThat(monnaie1).isNotEqualTo(monnaie2);
        monnaie1.setId(null);
        assertThat(monnaie1).isNotEqualTo(monnaie2);
    }
}
