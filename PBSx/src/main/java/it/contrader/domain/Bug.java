package it.contrader.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Bug.
 */
@Entity
@Table(name = "bug")
public class Bug implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "state")
    private String state;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date")
    private String date;

    @Column(name = "dependence_list")
    private String dependenceList;

    @OneToMany(mappedBy = "bug")
    private Set<Solution> solutions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "bugs", allowSetters = true)
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Bug code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getState() {
        return state;
    }

    public Bug state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDescription() {
        return description;
    }

    public Bug description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public Bug date(String date) {
        this.date = date;
        return this;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDependenceList() {
        return dependenceList;
    }

    public Bug dependenceList(String dependenceList) {
        this.dependenceList = dependenceList;
        return this;
    }

    public void setDependenceList(String dependenceList) {
        this.dependenceList = dependenceList;
    }

    public Set<Solution> getSolutions() {
        return solutions;
    }

    public Bug solutions(Set<Solution> solutions) {
        this.solutions = solutions;
        return this;
    }

    public Bug addSolution(Solution solution) {
        this.solutions.add(solution);
        solution.setBug(this);
        return this;
    }

    public Bug removeSolution(Solution solution) {
        this.solutions.remove(solution);
        solution.setBug(null);
        return this;
    }

    public void setSolutions(Set<Solution> solutions) {
        this.solutions = solutions;
    }

    public Project getProject() {
        return project;
    }

    public Bug project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bug)) {
            return false;
        }
        return id != null && id.equals(((Bug) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bug{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", state='" + getState() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", dependenceList='" + getDependenceList() + "'" +
            "}";
    }
}
