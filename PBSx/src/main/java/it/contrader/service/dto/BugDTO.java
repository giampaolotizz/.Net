package it.contrader.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link it.contrader.domain.Bug} entity.
 */
public class BugDTO implements Serializable {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -1187987960248849584L;

	private Long id;

    @NotNull
    private String code;

    private String state;

    @NotNull
    private String description;

    private String date;

    private String dependenceList;


    private Long projectId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDependenceList() {
        return dependenceList;
    }

    public void setDependenceList(String dependenceList) {
        this.dependenceList = dependenceList;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BugDTO)) {
            return false;
        }

        return id != null && id.equals(((BugDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BugDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", state='" + getState() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", dependenceList='" + getDependenceList() + "'" +
            ", projectId=" + getProjectId() +
            "}";
    }
}
