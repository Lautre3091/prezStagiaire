package com.capgemini.prez.web.rest;

import com.capgemini.prez.PrezStagiaireApp;

import com.capgemini.prez.domain.Saga;
import com.capgemini.prez.repository.SagaRepository;
import com.capgemini.prez.service.SagaService;
import com.capgemini.prez.service.dto.SagaDTO;
import com.capgemini.prez.service.mapper.SagaMapper;
import com.capgemini.prez.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.capgemini.prez.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SagaResource REST controller.
 *
 * @see SagaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrezStagiaireApp.class)
public class SagaResourceIntTest {

    private static final String DEFAULT_SAGA_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SAGA_NAME = "BBBBBBBBBB";

    @Autowired
    private SagaRepository sagaRepository;

    @Autowired
    private SagaMapper sagaMapper;

    @Autowired
    private SagaService sagaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSagaMockMvc;

    private Saga saga;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SagaResource sagaResource = new SagaResource(sagaService);
        this.restSagaMockMvc = MockMvcBuilders.standaloneSetup(sagaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Saga createEntity(EntityManager em) {
        Saga saga = new Saga()
            .sagaName(DEFAULT_SAGA_NAME);
        return saga;
    }

    @Before
    public void initTest() {
        saga = createEntity(em);
    }

    @Test
    @Transactional
    public void createSaga() throws Exception {
        int databaseSizeBeforeCreate = sagaRepository.findAll().size();

        // Create the Saga
        SagaDTO sagaDTO = sagaMapper.toDto(saga);
        restSagaMockMvc.perform(post("/api/sagas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sagaDTO)))
            .andExpect(status().isCreated());

        // Validate the Saga in the database
        List<Saga> sagaList = sagaRepository.findAll();
        assertThat(sagaList).hasSize(databaseSizeBeforeCreate + 1);
        Saga testSaga = sagaList.get(sagaList.size() - 1);
        assertThat(testSaga.getSagaName()).isEqualTo(DEFAULT_SAGA_NAME);
    }

    @Test
    @Transactional
    public void createSagaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sagaRepository.findAll().size();

        // Create the Saga with an existing ID
        saga.setId(1L);
        SagaDTO sagaDTO = sagaMapper.toDto(saga);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSagaMockMvc.perform(post("/api/sagas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sagaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Saga in the database
        List<Saga> sagaList = sagaRepository.findAll();
        assertThat(sagaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSagaNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sagaRepository.findAll().size();
        // set the field null
        saga.setSagaName(null);

        // Create the Saga, which fails.
        SagaDTO sagaDTO = sagaMapper.toDto(saga);

        restSagaMockMvc.perform(post("/api/sagas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sagaDTO)))
            .andExpect(status().isBadRequest());

        List<Saga> sagaList = sagaRepository.findAll();
        assertThat(sagaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSagas() throws Exception {
        // Initialize the database
        sagaRepository.saveAndFlush(saga);

        // Get all the sagaList
        restSagaMockMvc.perform(get("/api/sagas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(saga.getId().intValue())))
            .andExpect(jsonPath("$.[*].sagaName").value(hasItem(DEFAULT_SAGA_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSaga() throws Exception {
        // Initialize the database
        sagaRepository.saveAndFlush(saga);

        // Get the saga
        restSagaMockMvc.perform(get("/api/sagas/{id}", saga.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(saga.getId().intValue()))
            .andExpect(jsonPath("$.sagaName").value(DEFAULT_SAGA_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSaga() throws Exception {
        // Get the saga
        restSagaMockMvc.perform(get("/api/sagas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSaga() throws Exception {
        // Initialize the database
        sagaRepository.saveAndFlush(saga);
        int databaseSizeBeforeUpdate = sagaRepository.findAll().size();

        // Update the saga
        Saga updatedSaga = sagaRepository.findOne(saga.getId());
        // Disconnect from session so that the updates on updatedSaga are not directly saved in db
        em.detach(updatedSaga);
        updatedSaga
            .sagaName(UPDATED_SAGA_NAME);
        SagaDTO sagaDTO = sagaMapper.toDto(updatedSaga);

        restSagaMockMvc.perform(put("/api/sagas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sagaDTO)))
            .andExpect(status().isOk());

        // Validate the Saga in the database
        List<Saga> sagaList = sagaRepository.findAll();
        assertThat(sagaList).hasSize(databaseSizeBeforeUpdate);
        Saga testSaga = sagaList.get(sagaList.size() - 1);
        assertThat(testSaga.getSagaName()).isEqualTo(UPDATED_SAGA_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSaga() throws Exception {
        int databaseSizeBeforeUpdate = sagaRepository.findAll().size();

        // Create the Saga
        SagaDTO sagaDTO = sagaMapper.toDto(saga);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSagaMockMvc.perform(put("/api/sagas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sagaDTO)))
            .andExpect(status().isCreated());

        // Validate the Saga in the database
        List<Saga> sagaList = sagaRepository.findAll();
        assertThat(sagaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSaga() throws Exception {
        // Initialize the database
        sagaRepository.saveAndFlush(saga);
        int databaseSizeBeforeDelete = sagaRepository.findAll().size();

        // Get the saga
        restSagaMockMvc.perform(delete("/api/sagas/{id}", saga.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Saga> sagaList = sagaRepository.findAll();
        assertThat(sagaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Saga.class);
        Saga saga1 = new Saga();
        saga1.setId(1L);
        Saga saga2 = new Saga();
        saga2.setId(saga1.getId());
        assertThat(saga1).isEqualTo(saga2);
        saga2.setId(2L);
        assertThat(saga1).isNotEqualTo(saga2);
        saga1.setId(null);
        assertThat(saga1).isNotEqualTo(saga2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SagaDTO.class);
        SagaDTO sagaDTO1 = new SagaDTO();
        sagaDTO1.setId(1L);
        SagaDTO sagaDTO2 = new SagaDTO();
        assertThat(sagaDTO1).isNotEqualTo(sagaDTO2);
        sagaDTO2.setId(sagaDTO1.getId());
        assertThat(sagaDTO1).isEqualTo(sagaDTO2);
        sagaDTO2.setId(2L);
        assertThat(sagaDTO1).isNotEqualTo(sagaDTO2);
        sagaDTO1.setId(null);
        assertThat(sagaDTO1).isNotEqualTo(sagaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sagaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sagaMapper.fromId(null)).isNull();
    }
}
