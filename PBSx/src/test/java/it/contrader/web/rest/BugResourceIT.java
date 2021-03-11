package it.contrader.web.rest;

import it.contrader.PbSxApp;
import it.contrader.domain.Bug;
import it.contrader.repository.BugRepository;
import it.contrader.service.BugService;
import it.contrader.service.dto.BugDTO;
import it.contrader.service.mapper.BugMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BugResource} REST controller.
 */
@SpringBootTest(classes = PbSxApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BugResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_DEPENDENCE_LIST = "AAAAAAAAAA";
    private static final String UPDATED_DEPENDENCE_LIST = "BBBBBBBBBB";

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private BugMapper bugMapper;

    @SuppressWarnings("unused")
	@Autowired
    private BugService bugService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBugMockMvc;

    private Bug bug;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bug createEntity(EntityManager em) {
        Bug bug = new Bug()
            .code(DEFAULT_CODE)
            .state(DEFAULT_STATE)
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE)
            .dependenceList(DEFAULT_DEPENDENCE_LIST);
        return bug;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bug createUpdatedEntity(EntityManager em) {
        Bug bug = new Bug()
            .code(UPDATED_CODE)
            .state(UPDATED_STATE)
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .dependenceList(UPDATED_DEPENDENCE_LIST);
        return bug;
    }

    @BeforeEach
    public void initTest() {
        bug = createEntity(em);
    }

    @Test
    @Transactional
    public void createBug() throws Exception {
        int databaseSizeBeforeCreate = bugRepository.findAll().size();
        // Create the Bug
        BugDTO bugDTO = bugMapper.toDto(bug);
        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bugDTO)))
            .andExpect(status().isCreated());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeCreate + 1);
        Bug testBug = bugList.get(bugList.size() - 1);
        assertThat(testBug.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testBug.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testBug.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBug.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testBug.getDependenceList()).isEqualTo(DEFAULT_DEPENDENCE_LIST);
    }

    @Test
    @Transactional
    public void createBugWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bugRepository.findAll().size();

        // Create the Bug with an existing ID
        bug.setId(1L);
        BugDTO bugDTO = bugMapper.toDto(bug);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bugDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bugRepository.findAll().size();
        // set the field null
        bug.setCode(null);

        // Create the Bug, which fails.
        BugDTO bugDTO = bugMapper.toDto(bug);


        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bugDTO)))
            .andExpect(status().isBadRequest());

        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = bugRepository.findAll().size();
        // set the field null
        bug.setDescription(null);

        // Create the Bug, which fails.
        BugDTO bugDTO = bugMapper.toDto(bug);


        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bugDTO)))
            .andExpect(status().isBadRequest());

        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBugs() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        // Get all the bugList
        restBugMockMvc.perform(get("/api/bugs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bug.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE)))
            .andExpect(jsonPath("$.[*].dependenceList").value(hasItem(DEFAULT_DEPENDENCE_LIST)));
    }
    
    @Test
    @Transactional
    public void getBug() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        // Get the bug
        restBugMockMvc.perform(get("/api/bugs/{id}", bug.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bug.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE))
            .andExpect(jsonPath("$.dependenceList").value(DEFAULT_DEPENDENCE_LIST));
    }
    @Test
    @Transactional
    public void getNonExistingBug() throws Exception {
        // Get the bug
        restBugMockMvc.perform(get("/api/bugs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBug() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        int databaseSizeBeforeUpdate = bugRepository.findAll().size();

        // Update the bug
        Bug updatedBug = bugRepository.findById(bug.getId()).get();
        // Disconnect from session so that the updates on updatedBug are not directly saved in db
        em.detach(updatedBug);
        updatedBug
            .code(UPDATED_CODE)
            .state(UPDATED_STATE)
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .dependenceList(UPDATED_DEPENDENCE_LIST);
        BugDTO bugDTO = bugMapper.toDto(updatedBug);

        restBugMockMvc.perform(put("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bugDTO)))
            .andExpect(status().isOk());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeUpdate);
        Bug testBug = bugList.get(bugList.size() - 1);
        assertThat(testBug.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testBug.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testBug.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBug.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testBug.getDependenceList()).isEqualTo(UPDATED_DEPENDENCE_LIST);
    }

    @Test
    @Transactional
    public void updateNonExistingBug() throws Exception {
        int databaseSizeBeforeUpdate = bugRepository.findAll().size();

        // Create the Bug
        BugDTO bugDTO = bugMapper.toDto(bug);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBugMockMvc.perform(put("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bugDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBug() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        int databaseSizeBeforeDelete = bugRepository.findAll().size();

        // Delete the bug
        restBugMockMvc.perform(delete("/api/bugs/{id}", bug.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
