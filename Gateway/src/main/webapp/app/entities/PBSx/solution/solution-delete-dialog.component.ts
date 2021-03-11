import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISolution } from 'app/shared/model/PBSx/solution.model';
import { SolutionService } from './solution.service';

@Component({
  templateUrl: './solution-delete-dialog.component.html',
})
export class SolutionDeleteDialogComponent {
  solution?: ISolution;

  constructor(protected solutionService: SolutionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.solutionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('solutionListModification');
      this.activeModal.close();
    });
  }
}
