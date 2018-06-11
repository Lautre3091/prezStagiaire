package com.capgemini.prez.service.mapper;

import com.capgemini.prez.domain.*;
import com.capgemini.prez.service.dto.BookDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Book and its DTO BookDTO.
 */
@Mapper(componentModel = "spring", uses = {AutorMapper.class, SagaMapper.class})
public interface BookMapper extends EntityMapper<BookDTO, Book> {

    @Mapping(source = "autor.id", target = "autorId")
    @Mapping(source = "saga.id", target = "sagaId")
    @Mapping(source = "saga.id", target = "sagaId")
    BookDTO toDto(Book book);

    @Mapping(source = "autorId", target = "autor")
    @Mapping(source = "sagaId", target = "saga")
    @Mapping(source = "sagaId", target = "saga")
    Book toEntity(BookDTO bookDTO);

    default Book fromId(Long id) {
        if (id == null) {
            return null;
        }
        Book book = new Book();
        book.setId(id);
        return book;
    }
}
