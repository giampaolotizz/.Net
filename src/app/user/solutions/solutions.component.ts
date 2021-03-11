import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
    bugs: BugDTO[];
    user: UserDTO;
    bugId: undefined;
    moveButton = "Insert";
    seeTable = true; 
  
    constructor(private service: SolutionService, private userService: UserService, 
      private bugService: BugService, private actRoute: ActivatedRoute) { }
  
    ngOnInit() {
      this.actRoute.params.subscribe((params)=> this.bugId = params.bugId);
      if (this.bugId == "undefined") {
        this.getSolutions();
      } else {
        this.getListBug();
      }
      
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.getBugs();
    }
  
    getSolutions() {
      this.service.getAll().subscribe(solutions => this.solutions = solutions);     
    }
  
    insert(solution: SolutionDTO) {
      this.service.insert(solution).subscribe(() => this.getSolutions());
      this.clear();
      this.seeTable = true;
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
  }