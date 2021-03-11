import { Injectable } from '@angular/core';
import { SolutionDTO } from '../dto/solutiondto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService } from './abstractservice.service';

/**
 * Classe che contiene i metodi di servizi per la soluzione
 * 
 * @author Francesco, Gianni, Marco
 *
 */
@Injectable({
  providedIn: 'root'
})
export class SolutionService extends AbstractService<SolutionDTO, Number>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'solution';
  }

getUser(userId: Number): Observable<SolutionDTO[]> {
    return this.http.get<SolutionDTO[]>('http://localhost:' + this.port + '/' + this.type + '/getuser?userId=' + userId);
}

getBug(bugId: Number): Observable<SolutionDTO[]> {
    return this.http.get<SolutionDTO[]>('http://localhost:' + this.port + '/' + 'services' + '/' + this.micro  + '/api/' + this.type+ 's'  + '/bug/' + bugId, {
      headers: {
        Authorization : this.auth()
      }
});
}

}