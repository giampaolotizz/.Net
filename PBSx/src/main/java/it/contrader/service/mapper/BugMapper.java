package it.contrader.service.mapper;


import it.contrader.domain.*;
import it.contrader.service.dto.BugDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bug} and its DTO {@link BugDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface BugMapper extends EntityMapper<BugDTO, Bug> {

    @Mapping(source = "project.id", target = "projectId")
    BugDTO toDto(Bug bug);

    @Mapping(target = "solutions", ignore = true)
    @Mapping(target = "removeSolution", ignore = true)
    @Mapping(source = "projectId", target = "project")
    Bug toEntity(BugDTO bugDTO);

    default Bug fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bug bug = new Bug();
        bug.setId(id);
        return bug;
    }
}
