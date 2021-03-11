import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProjectDetailComponent } from 'app/entities/PBSx/project/project-detail.component';
import { Project } from 'app/shared/model/PBSx/project.model';

describe('Component Tests', () => {
  describe('Project Management Detail Component', () => {
    let comp: ProjectDetailComponent;
    let fixture: ComponentFixture<ProjectDetailComponent>;
    const route = ({ data: of({ project: new Project(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProjectDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProjectDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProjectDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load project on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.project).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});