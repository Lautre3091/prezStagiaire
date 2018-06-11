package com.capgemini.prez.service.mapper;

import com.capgemini.prez.domain.*;
import com.capgemini.prez.service.dto.AutorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Autor and its DTO AutorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AutorMapper extends EntityMapper<AutorDTO, Autor> {


    @Mapping(target = "books", ignore = true)
    Autor toEntity(AutorDTO autorDTO);

    default Autor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Autor autor = new Autor();
        autor.setId(id);
        return autor;
    }
}
