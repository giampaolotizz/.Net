import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SolutionDetailComponent } from 'app/entities/PBSx/solution/solution-detail.component';
import { Solution } from 'app/shared/model/PBSx/solution.model';

describe('Component Tests', () => {
  describe('Solution Management Detail Component', () => {
    let comp: SolutionDetailComponent;
    let fixture: ComponentFixture<SolutionDetailComponent>;
    const route = ({ data: of({ solution: new Solution(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SolutionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SolutionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SolutionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load solution on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.solution).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
