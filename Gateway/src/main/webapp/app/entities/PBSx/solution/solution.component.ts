import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISolution } from 'app/shared/model/PBSx/solution.model';
import { SolutionService } from './solution.service';
import { SolutionDeleteDialogComponent } from './solution-delete-dialog.component';

@Component({
  selector: 'jhi-solution',
  templateUrl: './solution.component.html',
})
export class SolutionComponent implements OnInit, OnDestroy {
  solutions?: ISolution[];
  eventSubscriber?: Subscription;

  constructor(protected solutionService: SolutionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.solutionService.query().subscribe((res: HttpResponse<ISolution[]>) => (this.solutions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSolutions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISolution): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSolutions(): void {
    this.eventSubscriber = this.eventManager.subscribe('solutionListModification', () => this.loadAll());
  }

  delete(solution: ISolution): void {
    const modalRef = this.modalService.open(SolutionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.solution = solution;
  }
}
