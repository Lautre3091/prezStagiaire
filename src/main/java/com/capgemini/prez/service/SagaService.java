package com.capgemini.prez.service;

import com.capgemini.prez.service.dto.SagaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Saga.
 */
public interface SagaService {

    /**
     * Save a saga.
     *
     * @param sagaDTO the entity to save
     * @return the persisted entity
     */
    SagaDTO save(SagaDTO sagaDTO);

    /**
     * Get all the sagas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SagaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" saga.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SagaDTO findOne(Long id);

    /**
     * Delete the "id" saga.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
