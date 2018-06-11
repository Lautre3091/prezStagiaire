package com.capgemini.prez.service;

import com.capgemini.prez.service.dto.EditorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Editor.
 */
public interface EditorService {

    /**
     * Save a editor.
     *
     * @param editorDTO the entity to save
     * @return the persisted entity
     */
    EditorDTO save(EditorDTO editorDTO);

    /**
     * Get all the editors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EditorDTO> findAll(Pageable pageable);

    /**
     * Get the "id" editor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EditorDTO findOne(Long id);

    /**
     * Delete the "id" editor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
