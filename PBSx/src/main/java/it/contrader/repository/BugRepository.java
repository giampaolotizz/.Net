package it.contrader.repository;

import it.contrader.domain.Bug;
import it.contrader.domain.Project;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bug entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BugRepository extends JpaRepository<Bug, Long>, BugCriteria {
	
	/**
	 * Ritorna tutti i bug che hanno un certo bug fra le loro dipendenze
	 * 
	 * @param id Id del bug che vogliamo cercare fra le dipendenze
	 * 
	 * @return Lista di bug che hanno un certo bug fra le dipendenze
	 */
	List<Bug> findByDependenceListContaining (String code);
	
	/**
	 * Ritorna l'ultimo ID inserito nel DB
	 * 
	 * @param patternBug Pattern dell'ID (FE o BE)
	 * 
	 * @return L'ultimo ID inserito di una certa tipologia
	 */
	
	List<Bug> findByCodeContaining (String code);	
	
	List<Bug> findByProject(Project project);
	
}
