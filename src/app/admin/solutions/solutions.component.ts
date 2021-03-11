import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { BugDTO } from "src/dto/bugdto";
import { SolutionDTO } from "src/dto/solutiondto";
import { UserDTO } from "src/dto/userdto";
import { BugService } from "src/service/bug.service";
import { SolutionService } from "src/service/solution.service";
import { UserService } from "src/service/user.service";

@Component({
    selector: 'app-solutions',
    templateUrl: './solutions.component.html',
    styleUrls: ['./solutions.component.css']
  })

  export class SolutionsComponent implements OnInit {

    solutions: SolutionDTO[];
    solutiontoinsert: SolutionDTO = new SolutionDTO();
    users: UserDTO[];
    bugs: BugDTO[];
    bugId: undefined;
    moveButton = "Insert";
    seeTable = true;
    bugCode: String;
  
    constructor(private service: SolutionService, private userService: UserService, 
      private bugService: BugService, private actRoute: ActivatedRoute, private router : Router) { }
  
    ngOnInit() {
      this.actRoute.params.subscribe((params)=> this.bugId = params.bugId);
      if (this.bugId == "undefined") {
        this.getSolutions();
      } else {
        this.getListBug();
      }
      this.getUsers();
      this.getBugs();
    }

  
    getSolutions() {
      this.service.getAll().subscribe(solutions => this.solutions = solutions);     
    }
  
    delete(solution: SolutionDTO) {
      this.service.delete(solution.id).subscribe(() => this.getSolutions());
    }
  
    update(solution: SolutionDTO) {
      console.log(solution);
     this.service.update(solution).subscribe(() => this.getSolutions());
    }
    
  
    insert(solution: SolutionDTO) {
      this.service.insert(solution).subscribe(() => this.getSolutions());
      this.clear();
      this.seeTable = true;
      this.moveButton = "Insert";

    }

    getUsers() {
      this.userService.getAll().subscribe(users => this.users = users);
    }

    getBugs() {
        this.bugService.getAll().subscribe(bugs => this.bugs = bugs);
    }

    getListBug() {
      this.service.getBug(this.bugId).subscribe(solutions => this.solutions = solutions);
    }

    getListUser(userId: Number) {
      this.service.getUser(userId).subscribe(solutions => this.solutions = solutions);
    }
  
    clear(){
      this.solutiontoinsert = new SolutionDTO();
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

    getBugCode(bugId: number): String{
     this.bugService.read(bugId).subscribe(bug => this.bugCode=bug.code);
     return this.bugCode; 
    }
  }