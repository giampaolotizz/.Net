import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISolution, Solution } from 'app/shared/model/PBSx/solution.model';
import { SolutionService } from './solution.service';
import { IBug } from 'app/shared/model/PBSx/bug.model';
import { BugService } from 'app/entities/PBSx/bug/bug.service';

@Component({
  selector: 'jhi-solution-update',
  templateUrl: './solution-update.component.html',
})
export class SolutionUpdateComponent implements OnInit {
  isSaving = false;
  bugs: IBug[] = [];

  editForm = this.fb.group({
    id: [],
    solution: [null, [Validators.required]],
    bugId: [],
  });

  constructor(
    protected solutionService: SolutionService,
    protected bugService: BugService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solution }) => {
      this.updateForm(solution);

      this.bugService.query().subscribe((res: HttpResponse<IBug[]>) => (this.bugs = res.body || []));
    });
  }

  updateForm(solution: ISolution): void {
    this.editForm.patchValue({
      id: solution.id,
      solution: solution.solution,
      bugId: solution.bugId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const solution = this.createFromForm();
    if (solution.id !== undefined) {
      this.subscribeToSaveResponse(this.solutionService.update(solution));
    } else {
      this.subscribeToSaveResponse(this.solutionService.create(solution));
    }
  }

  private createFromForm(): ISolution {
    return {
      ...new Solution(),
      id: this.editForm.get(['id'])!.value,
      solution: this.editForm.get(['solution'])!.value,
      bugId: this.editForm.get(['bugId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolution>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBug): any {
    return item.id;
  }
}
