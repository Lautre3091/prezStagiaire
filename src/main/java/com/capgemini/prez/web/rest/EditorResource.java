package com.capgemini.prez.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.capgemini.prez.service.EditorService;
import com.capgemini.prez.web.rest.errors.BadRequestAlertException;
import com.capgemini.prez.web.rest.util.HeaderUtil;
import com.capgemini.prez.web.rest.util.PaginationUtil;
import com.capgemini.prez.service.dto.EditorDTO;
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
 * REST controller for managing Editor.
 */
@RestController
@RequestMapping("/api")
public class EditorResource {

    private final Logger log = LoggerFactory.getLogger(EditorResource.class);

    private static final String ENTITY_NAME = "editor";

    private final EditorService editorService;

    public EditorResource(EditorService editorService) {
        this.editorService = editorService;
    }

    /**
     * POST  /editors : Create a new editor.
     *
     * @param editorDTO the editorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new editorDTO, or with status 400 (Bad Request) if the editor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/editors")
    @Timed
    public ResponseEntity<EditorDTO> createEditor(@Valid @RequestBody EditorDTO editorDTO) throws URISyntaxException {
        log.debug("REST request to save Editor : {}", editorDTO);
        if (editorDTO.getId() != null) {
            throw new BadRequestAlertException("A new editor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EditorDTO result = editorService.save(editorDTO);
        return ResponseEntity.created(new URI("/api/editors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /editors : Updates an existing editor.
     *
     * @param editorDTO the editorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated editorDTO,
     * or with status 400 (Bad Request) if the editorDTO is not valid,
     * or with status 500 (Internal Server Error) if the editorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/editors")
    @Timed
    public ResponseEntity<EditorDTO> updateEditor(@Valid @RequestBody EditorDTO editorDTO) throws URISyntaxException {
        log.debug("REST request to update Editor : {}", editorDTO);
        if (editorDTO.getId() == null) {
            return createEditor(editorDTO);
        }
        EditorDTO result = editorService.save(editorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, editorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /editors : get all the editors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of editors in body
     */
    @GetMapping("/editors")
    @Timed
    public ResponseEntity<List<EditorDTO>> getAllEditors(Pageable pageable) {
        log.debug("REST request to get a page of Editors");
        Page<EditorDTO> page = editorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/editors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /editors/:id : get the "id" editor.
     *
     * @param id the id of the editorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the editorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/editors/{id}")
    @Timed
    public ResponseEntity<EditorDTO> getEditor(@PathVariable Long id) {
        log.debug("REST request to get Editor : {}", id);
        EditorDTO editorDTO = editorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(editorDTO));
    }

    /**
     * DELETE  /editors/:id : delete the "id" editor.
     *
     * @param id the id of the editorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/editors/{id}")
    @Timed
    public ResponseEntity<Void> deleteEditor(@PathVariable Long id) {
        log.debug("REST request to delete Editor : {}", id);
        editorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
