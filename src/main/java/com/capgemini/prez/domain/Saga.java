package com.capgemini.prez.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Saga.
 */
@Entity
@Table(name = "saga")
public class Saga implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "saga_name", nullable = false)
    private String sagaName;

    @ManyToOne
    private Editor editor;

    @OneToMany(mappedBy = "saga")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSagaName() {
        return sagaName;
    }

    public Saga sagaName(String sagaName) {
        this.sagaName = sagaName;
        return this;
    }

    public void setSagaName(String sagaName) {
        this.sagaName = sagaName;
    }

    public Editor getEditor() {
        return editor;
    }

    public Saga editor(Editor editor) {
        this.editor = editor;
        return this;
    }

    public void setEditor(Editor editor) {
        this.editor = editor;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Saga books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Saga addBooks(Book book) {
        this.books.add(book);
        book.setSaga(this);
        return this;
    }

    public Saga removeBooks(Book book) {
        this.books.remove(book);
        book.setSaga(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
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
        Saga saga = (Saga) o;
        if (saga.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), saga.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Saga{" +
            "id=" + getId() +
            ", sagaName='" + getSagaName() + "'" +
            "}";
    }
}
