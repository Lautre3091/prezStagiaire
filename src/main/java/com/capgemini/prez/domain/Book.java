package com.capgemini.prez.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.capgemini.prez.domain.enumeration.Style;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "book_name", nullable = false)
    private String bookName;

    @Column(name = "nb_page")
    private String nbPage;

    @Enumerated(EnumType.STRING)
    @Column(name = "style")
    private Style style;

    @ManyToOne
    private Autor autor;

    @ManyToOne
    private Saga saga;

    @ManyToOne
    private Saga saga;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public Book bookName(String bookName) {
        this.bookName = bookName;
        return this;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getNbPage() {
        return nbPage;
    }

    public Book nbPage(String nbPage) {
        this.nbPage = nbPage;
        return this;
    }

    public void setNbPage(String nbPage) {
        this.nbPage = nbPage;
    }

    public Style getStyle() {
        return style;
    }

    public Book style(Style style) {
        this.style = style;
        return this;
    }

    public void setStyle(Style style) {
        this.style = style;
    }

    public Autor getAutor() {
        return autor;
    }

    public Book autor(Autor autor) {
        this.autor = autor;
        return this;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    public Saga getSaga() {
        return saga;
    }

    public Book saga(Saga saga) {
        this.saga = saga;
        return this;
    }

    public void setSaga(Saga saga) {
        this.saga = saga;
    }

    public Saga getSaga() {
        return saga;
    }

    public Book saga(Saga saga) {
        this.saga = saga;
        return this;
    }

    public void setSaga(Saga saga) {
        this.saga = saga;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Book book = (Book) o;
        if (book.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), book.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", bookName='" + getBookName() + "'" +
            ", nbPage='" + getNbPage() + "'" +
            ", style='" + getStyle() + "'" +
            "}";
    }
}
