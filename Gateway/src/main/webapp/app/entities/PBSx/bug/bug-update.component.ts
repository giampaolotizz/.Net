import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBug, Bug } from 'app/shared/model/PBSx/bug.model';
import { BugService } from './bug.service';
import { IProject } from 'app/shared/model/PBSx/project.model';
import { ProjectService } from 'app/entities/PBSx/project/project.service';

@Component({
  selector: 'jhi-bug-update',
  templateUrl: './bug-update.component.html',
})
export class BugUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    state: [],
    description: [null, [Validators.required]],
    date: [],
    dependenceList: [],
    projectId: [],
  });

  constructor(
    protected bugService: BugService,
    protected projectService: ProjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bug }) => {
      this.updateForm(bug);

      this.projectService.query().subscribe((res: HttpResponse<IProject[]>) => (this.projects = res.body || []));
    });
  }

  updateForm(bug: IBug): void {
    this.editForm.patchValue({
      id: bug.id,
      code: bug.code,
      state: bug.state,
      description: bug.description,
      date: bug.date,
      dependenceList: bug.dependenceList,
      projectId: bug.projectId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bug = this.createFromForm();
    if (bug.id !== undefined) {
      this.subscribeToSaveResponse(this.bugService.update(bug));
    } else {
      this.subscribeToSaveResponse(this.bugService.create(bug));
    }
  }

  private createFromForm(): IBug {
    return {
      ...new Bug(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      state: this.editForm.get(['state'])!.value,
      description: this.editForm.get(['description'])!.value,
      date: this.editForm.get(['date'])!.value,
      dependenceList: this.editForm.get(['dependenceList'])!.value,
      projectId: this.editForm.get(['projectId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBug>>): void {
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

  trackById(index: number, item: IProject): any {
    return item.id;
  }
}
