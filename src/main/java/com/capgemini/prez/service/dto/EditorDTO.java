package com.capgemini.prez.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Editor entity.
 */
public class EditorDTO implements Serializable {

    private Long id;

    @NotNull
    private String editorName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEditorName() {
        return editorName;
    }

    public void setEditorName(String editorName) {
        this.editorName = editorName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EditorDTO editorDTO = (EditorDTO) o;
        if(editorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), editorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EditorDTO{" +
            "id=" + getId() +
            ", editorName='" + getEditorName() + "'" +
            "}";
    }
}
