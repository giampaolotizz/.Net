import { Injectable } from '@angular/core';
import { ProjectDTO } from '../dto/projectdto';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstractservice.service';

/**
 * Classe che contiene i metodi di servizi per il progetto
 * 
 * @author Francesco, Gianni, Marco
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AbstractService<ProjectDTO, Number>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'project';
  }

}