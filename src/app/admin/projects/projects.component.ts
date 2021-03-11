import { Component, OnInit } from "@angular/core";
import { BugDTO } from "src/dto/bugdto";
import { ProjectDTO } from "src/dto/projectdto";
import { BugService } from "src/service/bug.service";
import { ProjectService } from "src/service/project.service";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
  })

  export class ProjectsComponent implements OnInit {

    projects: ProjectDTO[];
    projecttoinsert: ProjectDTO = new ProjectDTO();
    bugs: BugDTO[];
    moveButton = "Insert";
    seeTable = true;
  
    constructor(private service: ProjectService, private bugService: BugService) { }
  
    ngOnInit() {
      this.getProjects();
    }
  
    getProjects() {
      this.service.getAll().subscribe(projects => this.projects = projects);       
    }
  
    delete(project: ProjectDTO) {
      this.service.delete(project.id).subscribe(() => this.getProjects());
    }
  
    update(project: ProjectDTO) {
      this.service.update(project).subscribe(() => this.getProjects());
    }
  
    insert(project: ProjectDTO) {
      this.service.insert(project).subscribe(() => this.getProjects());
      this.clear();
      this.seeTable = true;
      this.moveButton = "Insert";

    }

    getListBug(project: ProjectDTO) {
      this.bugService.getProject(project.id).subscribe((bugs => this.bugs));
    }
  
    clear(){
      this.projecttoinsert = new ProjectDTO();
    }

    showInsertForm() {
      if (this.seeTable === true) {
        this.seeTable = false;
        this.moveButton = "To Table";
      } else { 
        this.seeTable = true; 
        this.moveButton = "Insert";
      }
    }
  }