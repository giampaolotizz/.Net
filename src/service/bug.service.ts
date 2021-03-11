import { Injectable } from '@angular/core';
import { BugDTO } from '../dto/bugdto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService } from './abstractservice.service';

/**
 * Classe che contiene i metodi di servizi per il bug
 * 
 * @author Francesco, Gianni, Marco
 *
 */
@Injectable({
  providedIn: 'root'
})
export class BugService extends AbstractService<BugDTO, Number>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'bug';
  }

getUser(userId: Number): Observable<BugDTO[]> {
    return this.http.get<BugDTO[]>('http://localhost:' + this.port + '/' + this.type + '/getuser?userId=' + userId);
}

getProject(projectId: Number): Observable<BugDTO[]> {
    
    return this.http.get<BugDTO[]>('http://localhost:' + this.port + '/' + 'services' + '/' + this.micro  + '/api/' + this.type+ 's'  + '/project/' + projectId, {
      headers: {
        Authorization : this.auth()
      }
    });
}

}