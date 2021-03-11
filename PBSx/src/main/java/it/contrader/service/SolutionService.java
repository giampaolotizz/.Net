package it.contrader.service;

import it.contrader.service.dto.SolutionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link it.contrader.domain.Solution}.
 */
public interface SolutionService {

    /**
     * Save a solution.
     *
     * @param solutionDTO the entity to save.
     * @return the persisted entity.
     */
    SolutionDTO save(SolutionDTO solutionDTO);

    /**
     * Get all the solutions.
     *
     * @return the list of entities.
     */
    List<SolutionDTO> findAll();


    /**
     * Get the "id" solution.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SolutionDTO> findOne(Long id);

    /**
     * Delete the "id" solution.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    
    List<SolutionDTO> findByBug(Long id);
}
