import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDashboardComponent} from './user-dashboard/user-dashboard.component'
import { ProjectsComponent } from './projects/projects.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { BugsComponent } from './bugs/bugs.component';
import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [UserDashboardComponent, AccountComponent, ProjectsComponent, BugsComponent, SolutionsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
