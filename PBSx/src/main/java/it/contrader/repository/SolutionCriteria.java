package it.contrader.repository;

import java.util.List;

import it.contrader.domain.Bug;
import it.contrader.domain.Solution;

/**
 * Interfaccia per le Query Criteria di Solution
 * 
 * @author Francesco, Gianni, Marco
 *
 */
public interface SolutionCriteria {
	/**
	 * Stampa tutte le soluzioni per un singolo bug
	 * 
	 * @param bug Bug che vogliamo controllare
	 * 
	 * @return Lista di soluzioni legate a un certo bug
	 */
	List<Solution> findByBug (Bug bug);

}