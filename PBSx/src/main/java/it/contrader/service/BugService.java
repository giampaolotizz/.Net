package it.contrader.service;

import it.contrader.service.dto.BugDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link it.contrader.domain.Bug}.
 */
public interface BugService {

    /**
     * Save a bug.
     *
     * @param bugDTO the entity to save.
     * @return the persisted entity.
     */
    BugDTO save(BugDTO bugDTO);

    /**
     * Get all the bugs.
     *
     * @return the list of entities.
     */
    List<BugDTO> findAll();


    /**
     * Get the "id" bug.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BugDTO> findOne(Long id);

    /**
     * Delete the "id" bug.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    
    /**
     * Update a bug
     * 
     * @param bugDTO the entity to update
     * @return the persisted entity
     */
    BugDTO update(BugDTO bugDTO);
    
    public List<BugDTO> findByProject(Long id);
    
}
