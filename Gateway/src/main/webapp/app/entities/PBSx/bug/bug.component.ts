import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBug } from 'app/shared/model/PBSx/bug.model';
import { BugService } from './bug.service';
import { BugDeleteDialogComponent } from './bug-delete-dialog.component';

@Component({
  selector: 'jhi-bug',
  templateUrl: './bug.component.html',
})
export class BugComponent implements OnInit, OnDestroy {
  bugs?: IBug[];
  eventSubscriber?: Subscription;

  constructor(protected bugService: BugService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.bugService.query().subscribe((res: HttpResponse<IBug[]>) => (this.bugs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBugs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBug): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBugs(): void {
    this.eventSubscriber = this.eventManager.subscribe('bugListModification', () => this.loadAll());
  }

  delete(bug: IBug): void {
    const modalRef = this.modalService.open(BugDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bug = bug;
  }
}
