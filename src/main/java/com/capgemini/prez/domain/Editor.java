package com.capgemini.prez.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Editor.
 */
@Entity
@Table(name = "editor")
public class Editor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "editor_name", nullable = false)
    private String editorName;

    @OneToMany(mappedBy = "editor")
    @JsonIgnore
    private Set<Saga> sagases = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEditorName() {
        return editorName;
    }

    public Editor editorName(String editorName) {
        this.editorName = editorName;
        return this;
    }

    public void setEditorName(String editorName) {
        this.editorName = editorName;
    }

    public Set<Saga> getSagases() {
        return sagases;
    }

    public Editor sagases(Set<Saga> sagas) {
        this.sagases = sagas;
        return this;
    }

    public Editor addSagas(Saga saga) {
        this.sagases.add(saga);
        saga.setEditor(this);
        return this;
    }

    public Editor removeSagas(Saga saga) {
        this.sagases.remove(saga);
        saga.setEditor(null);
        return this;
    }

    public void setSagases(Set<Saga> sagas) {
        this.sagases = sagas;
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
        Editor editor = (Editor) o;
        if (editor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), editor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Editor{" +
            "id=" + getId() +
            ", editorName='" + getEditorName() + "'" +
            "}";
    }
}
