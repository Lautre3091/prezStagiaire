package com.capgemini.prez.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.capgemini.prez.domain.enumeration.Style;

/**
 * A DTO for the Book entity.
 */
public class BookDTO implements Serializable {

    private Long id;

    @NotNull
    private String bookName;

    private String nbPage;

    private Style style;

    private Long autorId;

    private Long sagaId;

    private Long sagaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getNbPage() {
        return nbPage;
    }

    public void setNbPage(String nbPage) {
        this.nbPage = nbPage;
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style style) {
        this.style = style;
    }

    public Long getAutorId() {
        return autorId;
    }

    public void setAutorId(Long autorId) {
        this.autorId = autorId;
    }

    public Long getSagaId() {
        return sagaId;
    }

    public void setSagaId(Long sagaId) {
        this.sagaId = sagaId;
    }

    public Long getSagaId() {
        return sagaId;
    }

    public void setSagaId(Long sagaId) {
        this.sagaId = sagaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BookDTO bookDTO = (BookDTO) o;
        if(bookDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bookDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BookDTO{" +
            "id=" + getId() +
            ", bookName='" + getBookName() + "'" +
            ", nbPage='" + getNbPage() + "'" +
            ", style='" + getStyle() + "'" +
            "}";
    }
}
