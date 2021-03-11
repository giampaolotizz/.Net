import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISolution } from 'app/shared/model/PBSx/solution.model';

type EntityResponseType = HttpResponse<ISolution>;
type EntityArrayResponseType = HttpResponse<ISolution[]>;

@Injectable({ providedIn: 'root' })
export class SolutionService {
  public resourceUrl = SERVER_API_URL + 'services/pbsx/api/solutions';

  constructor(protected http: HttpClient) {}

  create(solution: ISolution): Observable<EntityResponseType> {
    return this.http.post<ISolution>(this.resourceUrl, solution, { observe: 'response' });
  }

  update(solution: ISolution): Observable<EntityResponseType> {
    return this.http.put<ISolution>(this.resourceUrl, solution, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISolution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISolution[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
