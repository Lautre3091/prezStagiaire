package com.capgemini.prez.service.mapper;

import com.capgemini.prez.domain.*;
import com.capgemini.prez.service.dto.EditorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Editor and its DTO EditorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EditorMapper extends EntityMapper<EditorDTO, Editor> {


    @Mapping(target = "sagases", ignore = true)
    Editor toEntity(EditorDTO editorDTO);

    default Editor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Editor editor = new Editor();
        editor.setId(id);
        return editor;
    }
}
