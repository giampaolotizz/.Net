package it.contrader.repository;

import java.util.List;

import it.contrader.domain.Bug;
import it.contrader.domain.Project;


/**
 * Interfaccia per le Query Criteria di Bug
 * 
 * @author Francesco, Gianni, Marco
 *
 */
public interface BugCriteria {
	/**
	 * Ritorna tutti i bug riferiti da un certo progetto
	 * 
	 * @param project Progetto che ci interessa
	 * 
	 * @return La lista di tutti i bug di interesse
	 */
	List<Bug> findByProject (Project project);
}
