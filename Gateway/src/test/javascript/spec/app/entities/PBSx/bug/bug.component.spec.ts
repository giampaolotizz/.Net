import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BugComponent } from 'app/entities/PBSx/bug/bug.component';
import { BugService } from 'app/entities/PBSx/bug/bug.service';
import { Bug } from 'app/shared/model/PBSx/bug.model';

describe('Component Tests', () => {
  describe('Bug Management Component', () => {
    let comp: BugComponent;
    let fixture: ComponentFixture<BugComponent>;
    let service: BugService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BugComponent],
      })
        .overrideTemplate(BugComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BugComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BugService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bug(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bugs && comp.bugs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
