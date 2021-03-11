package it.contrader.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link it.contrader.domain.Solution} entity.
 */
public class SolutionDTO implements Serializable {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 393522526002699736L;

	private Long id;

    @NotNull
    private String solution;


    private Long bugId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public Long getBugId() {
        return bugId;
    }

    public void setBugId(Long bugId) {
        this.bugId = bugId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SolutionDTO)) {
            return false;
        }

        return id != null && id.equals(((SolutionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SolutionDTO{" +
            "id=" + getId() +
            ", solution='" + getSolution() + "'" +
            ", bugId=" + getBugId() +
            "}";
    }
}
