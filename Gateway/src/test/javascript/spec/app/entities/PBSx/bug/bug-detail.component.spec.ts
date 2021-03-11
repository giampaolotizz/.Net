import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BugDetailComponent } from 'app/entities/PBSx/bug/bug-detail.component';
import { Bug } from 'app/shared/model/PBSx/bug.model';

describe('Component Tests', () => {
  describe('Bug Management Detail Component', () => {
    let comp: BugDetailComponent;
    let fixture: ComponentFixture<BugDetailComponent>;
    const route = ({ data: of({ bug: new Bug(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BugDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BugDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BugDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bug on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bug).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
