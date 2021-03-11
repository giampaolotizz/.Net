import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBug } from 'app/shared/model/PBSx/bug.model';

type EntityResponseType = HttpResponse<IBug>;
type EntityArrayResponseType = HttpResponse<IBug[]>;

@Injectable({ providedIn: 'root' })
export class BugService {
  public resourceUrl = SERVER_API_URL + 'services/pbsx/api/bugs';

  constructor(protected http: HttpClient) {}

  create(bug: IBug): Observable<EntityResponseType> {
    return this.http.post<IBug>(this.resourceUrl, bug, { observe: 'response' });
  }

  update(bug: IBug): Observable<EntityResponseType> {
    return this.http.put<IBug>(this.resourceUrl, bug, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBug>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBug[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
