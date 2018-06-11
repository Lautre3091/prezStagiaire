package com.capgemini.prez.web.rest;

import com.capgemini.prez.PrezStagiaireApp;

import com.capgemini.prez.domain.Editor;
import com.capgemini.prez.repository.EditorRepository;
import com.capgemini.prez.service.EditorService;
import com.capgemini.prez.service.dto.EditorDTO;
import com.capgemini.prez.service.mapper.EditorMapper;
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
 * Test class for the EditorResource REST controller.
 *
 * @see EditorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrezStagiaireApp.class)
public class EditorResourceIntTest {

    private static final String DEFAULT_EDITOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EDITOR_NAME = "BBBBBBBBBB";

    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private EditorMapper editorMapper;

    @Autowired
    private EditorService editorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEditorMockMvc;

    private Editor editor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EditorResource editorResource = new EditorResource(editorService);
        this.restEditorMockMvc = MockMvcBuilders.standaloneSetup(editorResource)
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
    public static Editor createEntity(EntityManager em) {
        Editor editor = new Editor()
            .editorName(DEFAULT_EDITOR_NAME);
        return editor;
    }

    @Before
    public void initTest() {
        editor = createEntity(em);
    }

    @Test
    @Transactional
    public void createEditor() throws Exception {
        int databaseSizeBeforeCreate = editorRepository.findAll().size();

        // Create the Editor
        EditorDTO editorDTO = editorMapper.toDto(editor);
        restEditorMockMvc.perform(post("/api/editors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorDTO)))
            .andExpect(status().isCreated());

        // Validate the Editor in the database
        List<Editor> editorList = editorRepository.findAll();
        assertThat(editorList).hasSize(databaseSizeBeforeCreate + 1);
        Editor testEditor = editorList.get(editorList.size() - 1);
        assertThat(testEditor.getEditorName()).isEqualTo(DEFAULT_EDITOR_NAME);
    }

    @Test
    @Transactional
    public void createEditorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = editorRepository.findAll().size();

        // Create the Editor with an existing ID
        editor.setId(1L);
        EditorDTO editorDTO = editorMapper.toDto(editor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEditorMockMvc.perform(post("/api/editors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Editor in the database
        List<Editor> editorList = editorRepository.findAll();
        assertThat(editorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEditorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = editorRepository.findAll().size();
        // set the field null
        editor.setEditorName(null);

        // Create the Editor, which fails.
        EditorDTO editorDTO = editorMapper.toDto(editor);

        restEditorMockMvc.perform(post("/api/editors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorDTO)))
            .andExpect(status().isBadRequest());

        List<Editor> editorList = editorRepository.findAll();
        assertThat(editorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEditors() throws Exception {
        // Initialize the database
        editorRepository.saveAndFlush(editor);

        // Get all the editorList
        restEditorMockMvc.perform(get("/api/editors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(editor.getId().intValue())))
            .andExpect(jsonPath("$.[*].editorName").value(hasItem(DEFAULT_EDITOR_NAME.toString())));
    }

    @Test
    @Transactional
    public void getEditor() throws Exception {
        // Initialize the database
        editorRepository.saveAndFlush(editor);

        // Get the editor
        restEditorMockMvc.perform(get("/api/editors/{id}", editor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(editor.getId().intValue()))
            .andExpect(jsonPath("$.editorName").value(DEFAULT_EDITOR_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEditor() throws Exception {
        // Get the editor
        restEditorMockMvc.perform(get("/api/editors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEditor() throws Exception {
        // Initialize the database
        editorRepository.saveAndFlush(editor);
        int databaseSizeBeforeUpdate = editorRepository.findAll().size();

        // Update the editor
        Editor updatedEditor = editorRepository.findOne(editor.getId());
        // Disconnect from session so that the updates on updatedEditor are not directly saved in db
        em.detach(updatedEditor);
        updatedEditor
            .editorName(UPDATED_EDITOR_NAME);
        EditorDTO editorDTO = editorMapper.toDto(updatedEditor);

        restEditorMockMvc.perform(put("/api/editors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorDTO)))
            .andExpect(status().isOk());

        // Validate the Editor in the database
        List<Editor> editorList = editorRepository.findAll();
        assertThat(editorList).hasSize(databaseSizeBeforeUpdate);
        Editor testEditor = editorList.get(editorList.size() - 1);
        assertThat(testEditor.getEditorName()).isEqualTo(UPDATED_EDITOR_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEditor() throws Exception {
        int databaseSizeBeforeUpdate = editorRepository.findAll().size();

        // Create the Editor
        EditorDTO editorDTO = editorMapper.toDto(editor);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEditorMockMvc.perform(put("/api/editors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorDTO)))
            .andExpect(status().isCreated());

        // Validate the Editor in the database
        List<Editor> editorList = editorRepository.findAll();
        assertThat(editorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEditor() throws Exception {
        // Initialize the database
        editorRepository.saveAndFlush(editor);
        int databaseSizeBeforeDelete = editorRepository.findAll().size();

        // Get the editor
        restEditorMockMvc.perform(delete("/api/editors/{id}", editor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Editor> editorList = editorRepository.findAll();
        assertThat(editorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Editor.class);
        Editor editor1 = new Editor();
        editor1.setId(1L);
        Editor editor2 = new Editor();
        editor2.setId(editor1.getId());
        assertThat(editor1).isEqualTo(editor2);
        editor2.setId(2L);
        assertThat(editor1).isNotEqualTo(editor2);
        editor1.setId(null);
        assertThat(editor1).isNotEqualTo(editor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EditorDTO.class);
        EditorDTO editorDTO1 = new EditorDTO();
        editorDTO1.setId(1L);
        EditorDTO editorDTO2 = new EditorDTO();
        assertThat(editorDTO1).isNotEqualTo(editorDTO2);
        editorDTO2.setId(editorDTO1.getId());
        assertThat(editorDTO1).isEqualTo(editorDTO2);
        editorDTO2.setId(2L);
        assertThat(editorDTO1).isNotEqualTo(editorDTO2);
        editorDTO1.setId(null);
        assertThat(editorDTO1).isNotEqualTo(editorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(editorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(editorMapper.fromId(null)).isNull();
    }
}
