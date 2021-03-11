package it.contrader.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.contrader.domain.Bug;
import it.contrader.domain.Project;
import it.contrader.repository.BugRepository;
import it.contrader.repository.ProjectRepository;
import it.contrader.service.BugService;
import it.contrader.service.dto.BugDTO;
import it.contrader.service.mapper.BugMapper;

/**
 * Service Implementation for managing {@link Bug}.
 */
@Service
@Transactional
public class BugServiceImpl implements BugService {

    private final Logger log = LoggerFactory.getLogger(BugServiceImpl.class);

    private final BugRepository bugRepository;
    
    private final ProjectRepository projectRepository;

    private final BugMapper bugMapper;

    public BugServiceImpl(BugRepository bugRepository, BugMapper bugMapper, ProjectRepository projectRepository) {
        this.bugRepository = bugRepository;
        this.bugMapper = bugMapper;
        this.projectRepository = projectRepository;
    }

    @Override
    public BugDTO save(BugDTO dto) {
    	
    	DateFormat dateFormat= new SimpleDateFormat("yyyy/MM/dd");
        Date data= new Date();
		dto.setDate(dateFormat.format(data));
		
		String newCode = "";
		List<Bug> bugs = bugRepository.findByCodeContaining(dto.getCode());
		if (bugs.isEmpty()) {
			newCode = dto.getCode() + "001";
		} else {
			Bug bug = bugs.get(bugs.size() - 1);
			String lastCode = bug.getCode();
			int numberPartId = Integer.parseInt(lastCode.substring(2, lastCode.length())) + 1;
			if (numberPartId < 10) {
				newCode = dto.getCode() + "00" + numberPartId;
			} else if (numberPartId < 100) {
				newCode = dto.getCode() + "0" + numberPartId;
			} else {
				newCode = dto.getCode() + numberPartId;
			}
		}
		
		dto.setCode(newCode);
		dto.setState("aperto");
		
		
        log.debug("Request to save Bug : {}", dto);
        Bug bug = bugMapper.toEntity(dto);
        bug = bugRepository.save(bug);	
        return bugMapper.toDto(bug);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BugDTO> findAll() {
        log.debug("Request to get all Bugs");
        return bugRepository.findAll().stream()
            .map(bugMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BugDTO> findByProject(Long id) {
        log.debug("Request to get all Bugs for the project "+id);
        Project p = projectRepository.findById(id).get() ;
        return bugRepository.findByProject(p).stream()
            .map(bugMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<BugDTO> findOne(Long id) {
        log.debug("Request to get Bug : {}", id);
        return bugRepository.findById(id)
            .map(bugMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bug : {}", id);
        bugRepository.deleteById(id);
    }

	@Override
	public BugDTO update(BugDTO bugDTO) {
	/*	final String uri = "http://localhost:8080/api/users/mails";
		
		RestTemplate template = new RestTemplate();
		String tryy = template.getForObject(uri, String.class);
		System.out.println("xxxx\t"+tryy);
		*/
		Bug bug = new Bug();
		bug = bugRepository.findById(bugDTO.getId()).get();
		
		 if(!bug.getState().equals(bugDTO.getState())) {			
			//List<String> allMail = userRepository.findMails();
			bug.setState(bugDTO.getState()); 
		    bugRepository.save(bug);
			//MailUtility.sendMailToAll(allMail, bug);
		}
		 
		if(bug.getState().equals("risolto")) {
			updateDipendenze(bug);
		}
		
		return bugMapper.toDto(bug);
		
	}
	
	/**
	 * Quando il bug va in status "risolto" automaticamente modifichiamo la sua lista di dipendenze
	 * 
	 * @param bug Bug che e' stato risolto	 
	 */
	private void updateDipendenze(Bug bug) {
		List<Bug> list = bugRepository.findByDependenceListContaining(bug.getCode());
		for (Bug b : list) {
			String[] oldDep = b.getDependenceList().split(",");
			String res = "";
			for (int i = 0; i < oldDep.length; i ++) {
			    if(!oldDep[i].equals(bug.getCode())) {
				    res += oldDep[i];
				    res += ",";
				}
			}

			String newDependence = "";
			if (!res.equals("")) {
				newDependence = res.substring(0, res.length() - 1); 
			} else { 
				newDependence = null;
			}

			b.setDependenceList(newDependence);
		
			bugRepository.save(b);			
		}
		
	}
	
}
