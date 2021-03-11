import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SolutionComponent } from './solution.component';
import { SolutionDetailComponent } from './solution-detail.component';
import { SolutionUpdateComponent } from './solution-update.component';
import { SolutionDeleteDialogComponent } from './solution-delete-dialog.component';
import { solutionRoute } from './solution.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(solutionRoute)],
  declarations: [SolutionComponent, SolutionDetailComponent, SolutionUpdateComponent, SolutionDeleteDialogComponent],
  entryComponents: [SolutionDeleteDialogComponent],
})
export class PbSxSolutionModule {}
