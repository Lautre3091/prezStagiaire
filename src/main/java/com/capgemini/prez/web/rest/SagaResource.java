package com.capgemini.prez.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.capgemini.prez.service.SagaService;
import com.capgemini.prez.web.rest.errors.BadRequestAlertException;
import com.capgemini.prez.web.rest.util.HeaderUtil;
import com.capgemini.prez.web.rest.util.PaginationUtil;
import com.capgemini.prez.service.dto.SagaDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Saga.
 */
@RestController
@RequestMapping("/api")
public class SagaResource {

    private final Logger log = LoggerFactory.getLogger(SagaResource.class);

    private static final String ENTITY_NAME = "saga";

    private final SagaService sagaService;

    public SagaResource(SagaService sagaService) {
        this.sagaService = sagaService;
    }

    /**
     * POST  /sagas : Create a new saga.
     *
     * @param sagaDTO the sagaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sagaDTO, or with status 400 (Bad Request) if the saga has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sagas")
    @Timed
    public ResponseEntity<SagaDTO> createSaga(@Valid @RequestBody SagaDTO sagaDTO) throws URISyntaxException {
        log.debug("REST request to save Saga : {}", sagaDTO);
        if (sagaDTO.getId() != null) {
            throw new BadRequestAlertException("A new saga cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SagaDTO result = sagaService.save(sagaDTO);
        return ResponseEntity.created(new URI("/api/sagas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sagas : Updates an existing saga.
     *
     * @param sagaDTO the sagaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sagaDTO,
     * or with status 400 (Bad Request) if the sagaDTO is not valid,
     * or with status 500 (Internal Server Error) if the sagaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sagas")
    @Timed
    public ResponseEntity<SagaDTO> updateSaga(@Valid @RequestBody SagaDTO sagaDTO) throws URISyntaxException {
        log.debug("REST request to update Saga : {}", sagaDTO);
        if (sagaDTO.getId() == null) {
            return createSaga(sagaDTO);
        }
        SagaDTO result = sagaService.save(sagaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sagaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sagas : get all the sagas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sagas in body
     */
    @GetMapping("/sagas")
    @Timed
    public ResponseEntity<List<SagaDTO>> getAllSagas(Pageable pageable) {
        log.debug("REST request to get a page of Sagas");
        Page<SagaDTO> page = sagaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sagas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sagas/:id : get the "id" saga.
     *
     * @param id the id of the sagaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sagaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sagas/{id}")
    @Timed
    public ResponseEntity<SagaDTO> getSaga(@PathVariable Long id) {
        log.debug("REST request to get Saga : {}", id);
        SagaDTO sagaDTO = sagaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sagaDTO));
    }

    /**
     * DELETE  /sagas/:id : delete the "id" saga.
     *
     * @param id the id of the sagaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sagas/{id}")
    @Timed
    public ResponseEntity<Void> deleteSaga(@PathVariable Long id) {
        log.debug("REST request to delete Saga : {}", id);
        sagaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
