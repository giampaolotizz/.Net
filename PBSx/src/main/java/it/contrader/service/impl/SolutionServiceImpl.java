package it.contrader.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.contrader.domain.Bug;
import it.contrader.domain.Solution;
import it.contrader.repository.BugRepository;
import it.contrader.repository.SolutionRepository;
import it.contrader.service.SolutionService;
import it.contrader.service.dto.SolutionDTO;
import it.contrader.service.mapper.SolutionMapper;

/**
 * Service Implementation for managing {@link Solution}.
 */
@Service
@Transactional
public class SolutionServiceImpl implements SolutionService {

    private final Logger log = LoggerFactory.getLogger(SolutionServiceImpl.class);

    private final SolutionRepository solutionRepository;
    
    private final BugRepository bugRepository;

    private final SolutionMapper solutionMapper;

    public SolutionServiceImpl(SolutionRepository solutionRepository, SolutionMapper solutionMapper, BugRepository bugRepository) {
        this.solutionRepository = solutionRepository;
        this.solutionMapper = solutionMapper;
        this.bugRepository = bugRepository;
    }

    @Override
    public SolutionDTO save(SolutionDTO solutionDTO) {
        log.debug("Request to save Solution : {}", solutionDTO);
        Solution solution = solutionMapper.toEntity(solutionDTO);
        solution = solutionRepository.save(solution);
        return solutionMapper.toDto(solution);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SolutionDTO> findAll() {
        log.debug("Request to get all Solutions");
        return solutionRepository.findAll().stream()
            .map(solutionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<SolutionDTO> findByBug(Long id) {
        log.debug("Request to get all Bugs for the project "+id);
        Bug b = bugRepository.findById(id).get() ;
        return solutionRepository.findByBug(b).stream()
            .map(solutionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SolutionDTO> findOne(Long id) {
        log.debug("Request to get Solution : {}", id);
        return solutionRepository.findById(id)
            .map(solutionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Solution : {}", id);
        solutionRepository.deleteById(id);
    }
    
	/**
	 * Metodo che stampa tutte le soluzione relative a un bug
	 * 
	 * @param bug Bug di nostro interesse
	 * 
	 * @return Lista di soluzioni
	 */
	public List<SolutionDTO> findByBug (Bug bug) {
		return solutionMapper.toDto(solutionRepository.findByBug(bug));
	}
	

	/**
	 * Metodo che cerca una soluzione
	 * 
	 * @param id Id della soluzione da ricercare
	 * 
	 * @return Soluzione trovata, null se non e' presente
	 */
	public SolutionDTO findById (Long id) {
		return solutionMapper.toDto(solutionRepository.findById(id).get());
	}
}
