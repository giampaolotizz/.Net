import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  isClientCollapsed = false;
  isAccountCollapsed = false;
  isProjectCollapsed = false;
  isBugCollapsed = false;
  isSolutionCollapsed = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  projectscollapse() {
    if (this.isProjectCollapsed === false) {
      this.isProjectCollapsed = true;
    } else { this.isProjectCollapsed = false; }
  }

  bugscollapse() {
    if (this.isBugCollapsed === false) {
      this.isBugCollapsed = true;
    } else { this.isBugCollapsed = false; }
  }

  solutionscollapse() {
    if (this.isSolutionCollapsed === false) {
      this.isSolutionCollapsed = true;
    } else { this.isSolutionCollapsed = false; }
  }

  accountcollapse() {
    if (this.isAccountCollapsed === false) {
      this.isAccountCollapsed = true;
    } else { this.isAccountCollapsed = false; }
  }
}
