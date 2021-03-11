import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AccountComponent } from './account/account.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BugsComponent } from './bugs/bugs.component';
import { ProjectsComponent } from './projects/projects.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'admin-dashboard', component: AdminLayoutComponent, children:[
    { path: '', component: AdminDashboardComponent},
    { path: 'users', component: UsersComponent},
    { path: 'projects', component: ProjectsComponent},
    { path: 'solutions/:bugId', component: SolutionsComponent},
    { path: 'bugs/:projectId', component: BugsComponent},
    { path: 'account', component: AccountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }