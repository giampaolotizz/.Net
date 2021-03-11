import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'project',
        loadChildren: () => import('./PBSx/project/project.module').then(m => m.PbSxProjectModule),
      },
      {
        path: 'bug',
        loadChildren: () => import('./PBSx/bug/bug.module').then(m => m.PbSxBugModule),
      },
      {
        path: 'solution',
        loadChildren: () => import('./PBSx/solution/solution.module').then(m => m.PbSxSolutionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
