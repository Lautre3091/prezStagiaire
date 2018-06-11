package com.capgemini.prez.service.mapper;

import com.capgemini.prez.domain.*;
import com.capgemini.prez.service.dto.SagaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Saga and its DTO SagaDTO.
 */
@Mapper(componentModel = "spring", uses = {EditorMapper.class})
public interface SagaMapper extends EntityMapper<SagaDTO, Saga> {

    @Mapping(source = "editor.id", target = "editorId")
    SagaDTO toDto(Saga saga);

    @Mapping(source = "editorId", target = "editor")
    @Mapping(target = "books", ignore = true)
    Saga toEntity(SagaDTO sagaDTO);

    default Saga fromId(Long id) {
        if (id == null) {
            return null;
        }
        Saga saga = new Saga();
        saga.setId(id);
        return saga;
    }
}
