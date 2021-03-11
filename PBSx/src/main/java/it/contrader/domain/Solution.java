package it.contrader.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Solution.
 */
@Entity
@Table(name = "solution")
public class Solution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "solution", nullable = false)
    private String solution;

    @ManyToOne
    @JsonIgnoreProperties(value = "solutions", allowSetters = true)
    private Bug bug;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSolution() {
        return solution;
    }

    public Solution solution(String solution) {
        this.solution = solution;
        return this;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public Bug getBug() {
        return bug;
    }

    public Solution bug(Bug bug) {
        this.bug = bug;
        return this;
    }

    public void setBug(Bug bug) {
        this.bug = bug;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Solution)) {
            return false;
        }
        return id != null && id.equals(((Solution) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Solution{" +
            "id=" + getId() +
            ", solution='" + getSolution() + "'" +
            "}";
    }
}
