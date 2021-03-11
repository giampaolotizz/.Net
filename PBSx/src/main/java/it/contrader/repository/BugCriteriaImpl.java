package it.contrader.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;

import it.contrader.domain.Bug;
import it.contrader.domain.Project;


public class BugCriteriaImpl implements BugCriteria {

	/**
	 * Manager di un'entita' generica
	 */
	@Autowired
	private EntityManager entityManager;
	

	@Override
	public List<Bug> findByProject(Project project) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Bug> cq = cb.createQuery(Bug.class);
		
		Root<Bug> bug = cq.from(Bug.class);
		
		cq.where(cb.equal(bug.get("project"), project));
		
		TypedQuery<Bug> query = entityManager.createQuery(cq);
		
		return query.getResultList();
	}

}