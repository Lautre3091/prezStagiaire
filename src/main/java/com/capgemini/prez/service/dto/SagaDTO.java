package com.capgemini.prez.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Saga entity.
 */
public class SagaDTO implements Serializable {

    private Long id;

    @NotNull
    private String sagaName;

    private Long editorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSagaName() {
        return sagaName;
    }

    public void setSagaName(String sagaName) {
        this.sagaName = sagaName;
    }

    public Long getEditorId() {
        return editorId;
    }

    public void setEditorId(Long editorId) {
        this.editorId = editorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SagaDTO sagaDTO = (SagaDTO) o;
        if(sagaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sagaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SagaDTO{" +
            "id=" + getId() +
            ", sagaName='" + getSagaName() + "'" +
            "}";
    }
}
