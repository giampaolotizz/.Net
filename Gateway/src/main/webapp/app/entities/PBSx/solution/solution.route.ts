import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISolution, Solution } from 'app/shared/model/PBSx/solution.model';
import { SolutionService } from './solution.service';
import { SolutionComponent } from './solution.component';
import { SolutionDetailComponent } from './solution-detail.component';
import { SolutionUpdateComponent } from './solution-update.component';

@Injectable({ providedIn: 'root' })
export class SolutionResolve implements Resolve<ISolution> {
  constructor(private service: SolutionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISolution> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((solution: HttpResponse<Solution>) => {
          if (solution.body) {
            return of(solution.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Solution());
  }
}

export const solutionRoute: Routes = [
  {
    path: '',
    component: SolutionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Solutions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SolutionDetailComponent,
    resolve: {
      solution: SolutionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Solutions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SolutionUpdateComponent,
    resolve: {
      solution: SolutionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Solutions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SolutionUpdateComponent,
    resolve: {
      solution: SolutionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Solutions',
    },
    canActivate: [UserRouteAccessService],
  },
];
