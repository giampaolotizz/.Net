package it.contrader.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;

import it.contrader.domain.Bug;
import it.contrader.domain.Solution;


/**
 * Classe che implementa le query criteria di Solution
 * 
 * @author Francesco, Gianni, Marco
 *
 */
public class SolutionCriteriaImpl implements SolutionCriteria {

	/**
	 * Manager di un'entita' generica
	 */
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<Solution> findByBug(Bug bug) {
		
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Solution> cq = cb.createQuery(Solution.class);
		
		Root<Solution> solution = cq.from(Solution.class);
		
		cq.where(cb.equal(solution.get("bug"), bug));
		
		TypedQuery<Solution> query = entityManager.createQuery(cq);
		
		return query.getResultList();
	}


}
