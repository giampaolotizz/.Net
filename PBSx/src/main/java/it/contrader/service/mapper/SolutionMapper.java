package it.contrader.service.mapper;


import it.contrader.domain.*;
import it.contrader.service.dto.SolutionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Solution} and its DTO {@link SolutionDTO}.
 */
@Mapper(componentModel = "spring", uses = {BugMapper.class})
public interface SolutionMapper extends EntityMapper<SolutionDTO, Solution> {

    @Mapping(source = "bug.id", target = "bugId")
    SolutionDTO toDto(Solution solution);

    @Mapping(source = "bugId", target = "bug")
    Solution toEntity(SolutionDTO solutionDTO);

    default Solution fromId(Long id) {
        if (id == null) {
            return null;
        }
        Solution solution = new Solution();
        solution.setId(id);
        return solution;
    }
}
