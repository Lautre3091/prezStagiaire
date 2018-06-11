package com.capgemini.prez.service.impl;

import com.capgemini.prez.service.SagaService;
import com.capgemini.prez.domain.Saga;
import com.capgemini.prez.repository.SagaRepository;
import com.capgemini.prez.service.dto.SagaDTO;
import com.capgemini.prez.service.mapper.SagaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Saga.
 */
@Service
@Transactional
public class SagaServiceImpl implements SagaService {

    private final Logger log = LoggerFactory.getLogger(SagaServiceImpl.class);

    private final SagaRepository sagaRepository;

    private final SagaMapper sagaMapper;

    public SagaServiceImpl(SagaRepository sagaRepository, SagaMapper sagaMapper) {
        this.sagaRepository = sagaRepository;
        this.sagaMapper = sagaMapper;
    }

    /**
     * Save a saga.
     *
     * @param sagaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SagaDTO save(SagaDTO sagaDTO) {
        log.debug("Request to save Saga : {}", sagaDTO);
        Saga saga = sagaMapper.toEntity(sagaDTO);
        saga = sagaRepository.save(saga);
        return sagaMapper.toDto(saga);
    }

    /**
     * Get all the sagas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SagaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Sagas");
        return sagaRepository.findAll(pageable)
            .map(sagaMapper::toDto);
    }

    /**
     * Get one saga by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SagaDTO findOne(Long id) {
        log.debug("Request to get Saga : {}", id);
        Saga saga = sagaRepository.findOne(id);
        return sagaMapper.toDto(saga);
    }

    /**
     * Delete the saga by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Saga : {}", id);
        sagaRepository.delete(id);
    }
}
