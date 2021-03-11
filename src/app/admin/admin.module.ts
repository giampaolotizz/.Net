import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { BugsComponent } from './bugs/bugs.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [AdminDashboardComponent, AccountComponent, UsersComponent, ProjectsComponent, BugsComponent, SolutionsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
