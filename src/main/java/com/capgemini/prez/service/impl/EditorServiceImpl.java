package com.capgemini.prez.service.impl;

import com.capgemini.prez.service.EditorService;
import com.capgemini.prez.domain.Editor;
import com.capgemini.prez.repository.EditorRepository;
import com.capgemini.prez.service.dto.EditorDTO;
import com.capgemini.prez.service.mapper.EditorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Editor.
 */
@Service
@Transactional
public class EditorServiceImpl implements EditorService {

    private final Logger log = LoggerFactory.getLogger(EditorServiceImpl.class);

    private final EditorRepository editorRepository;

    private final EditorMapper editorMapper;

    public EditorServiceImpl(EditorRepository editorRepository, EditorMapper editorMapper) {
        this.editorRepository = editorRepository;
        this.editorMapper = editorMapper;
    }

    /**
     * Save a editor.
     *
     * @param editorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EditorDTO save(EditorDTO editorDTO) {
        log.debug("Request to save Editor : {}", editorDTO);
        Editor editor = editorMapper.toEntity(editorDTO);
        editor = editorRepository.save(editor);
        return editorMapper.toDto(editor);
    }

    /**
     * Get all the editors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EditorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Editors");
        return editorRepository.findAll(pageable)
            .map(editorMapper::toDto);
    }

    /**
     * Get one editor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EditorDTO findOne(Long id) {
        log.debug("Request to get Editor : {}", id);
        Editor editor = editorRepository.findOne(id);
        return editorMapper.toDto(editor);
    }

    /**
     * Delete the editor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Editor : {}", id);
        editorRepository.delete(id);
    }
}
