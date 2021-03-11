import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BugDTO } from "src/dto/bugdto";
import { ProjectDTO } from "src/dto/projectdto";
import { SolutionDTO } from "src/dto/solutiondto";
import { UserDTO } from "src/dto/userdto";
import { BugService } from "src/service/bug.service";
import { ProjectService } from "src/service/project.service";
import { SolutionService } from "src/service/solution.service";
import { UserService } from "src/service/user.service";

@Component({
    selector: 'app-bugs',
    templateUrl: './bugs.component.html',
    styleUrls: ['./bugs.component.css']
  })

  export class BugsComponent implements OnInit {

    bugs: BugDTO[];
    bugtoinsert: BugDTO = new BugDTO();
    users: UserDTO[];
    solutions: SolutionDTO[];
    projects: ProjectDTO[];
    projectId: undefined;
    dependenceList: [];
    moveButton = "Insert";
    seeTable = true;  
  
    constructor(private service: BugService, private userService: UserService, 
      private solutionService: SolutionService, private projectService: ProjectService,
      private actRoute : ActivatedRoute) { }
  
    ngOnInit() {
    this.actRoute.params.subscribe((params)=> this.projectId = params.projectId);
    if (this.projectId != 0) {
    this.getListProject();
    } else {
      this.getBugs();
    }

      this.getUsers();
      this.getSolutions();
      this.getProjects();
       
    }
  
    getBugs() {
      this.service.getAll().subscribe(bugs => this.bugs = bugs);      
    }
  
    delete(bug: BugDTO) {
     this.service.delete(bug.id).subscribe(() => this.getBugs());
    }
  
    update(bug: BugDTO) {
      this.service.update(bug).subscribe(() => this.getBugs());
    }
  
    insert(bug: BugDTO, bugForm: NgForm) {
      bug.dependenceList = Object.keys(bugForm.value.dependenceList).filter(key => bugForm.value.dependenceList[key] === true).join();
      this.service.insert(bug).subscribe(() => this.getBugs());
      this.clear();
      this.seeTable = true;
      this.moveButton = "Insert";
 
    }

    getUsers() {
        this.userService.getAll().subscribe(users => this.users = users);        
    }

    getSolutions() {
        this.solutionService.getAll().subscribe(solutions => this.solutions = solutions);
    }

    getProjects() {
      this.projectService.getAll().subscribe(projects => this.projects = projects);
    }

    getListProject() {
      this.service.getProject(this.projectId).subscribe(bugs => this.bugs = bugs);
    }  

    getListUser(userId: Number) {
      this.service.getUser(userId).subscribe(bugs => this.bugs = bugs);
    }
  
    clear(){
      this.bugtoinsert = new BugDTO();
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