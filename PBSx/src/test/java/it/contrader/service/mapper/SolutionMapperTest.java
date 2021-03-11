package it.contrader.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SolutionMapperTest {

    private SolutionMapper solutionMapper;

    @BeforeEach
    public void setUp() {
        solutionMapper = new SolutionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(solutionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(solutionMapper.fromId(null)).isNull();
    }
}
