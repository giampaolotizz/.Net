import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '../layout/user-layout/user-layout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BugsComponent } from './bugs/bugs.component';
import { ProjectsComponent } from './projects/projects.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'user-dashboard', component: UserLayoutComponent, children:[
    { path: '', component: UserDashboardComponent},
    { path: 'projects', component: ProjectsComponent},
    { path: 'solutions/:bugId', component: SolutionsComponent},
    { path: 'bugs/:projectId', component: BugsComponent},
    { path: 'account',component: AccountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }