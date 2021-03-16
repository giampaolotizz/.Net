import { Service } from './service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from 'src/dto/userdto';

/**
* Classe astratta che implementa i metodi dell'interfaccia Service
* 
* @author Francesco, Gianni, Marco
*
* @param <Entity> Entita' del servizio
* @param <DTO> DTO del servizio
* @param <T> Tipo generico dell'id
*/
export abstract class UserAbstractService<DTO, T> implements Service<DTO, T> {

    type: string;
    name: string;
    port: string = '8080';
    user: UserDTO;

    constructor(protected http: HttpClient) {
    }

    auth() {
        this.user = JSON.parse(localStorage.getItem('Autoken'));
        if (this.user) {
          return 'Bearer ' + this.user.authorities;
        } else {
          return '';
        }
    }

    getAll(): Observable<DTO[]> {

        return this.http.get<DTO[]>('http://localhost:8080/services/userService/api/user' , {
          headers: {
            Authorization : this.auth()
          }
        });
    }

    read(id: T): Observable<DTO> {
      
        return this.http.get<DTO>('http://localhost:' + this.port + '/'  + 'api' + '/' + this.type  + '/' + id, {
          headers: {
            Authorization : this.auth()
          }
        });
    }

    readUsername(id: String): Observable<DTO> {
      
      return this.http.get<DTO>('http://localhost:' + this.port + '/'  + 'api' + '/' + this.type  + '/' + id, {
        headers: {
          Authorization : this.auth()
        }
      });
  }

    delete(id: T): Observable<any> {
        return this.http.delete<DTO>('http://localhost:' + this.port + '/' + 'api' + '/' + this.type  + '/' + id, {
            headers: {
              Authorization : this.auth()
            }
          });
    }

    deleteUser(username: String): Observable<any> {
      return this.http.delete<DTO>('http://localhost:' + this.port + '/' + 'api' + '/' + this.type  + '/' + username, {
          headers: {
            Authorization : this.auth()
          }
        });
  }

    insert(dto: DTO): Observable<any> {
  

        return this.http.post<DTO>('http://localhost:' + this.port  + '/' + 'api' + '/' + this.type, dto , {
            headers: {
              Authorization : this.auth()
            }
          });
    }

    update(dto: DTO): Observable<DTO> {
        return this.http.put<DTO>('http://localhost:' + this.port + '/' + 'api' + '/' + this.type, dto , {
            headers: {
              Authorization : this.auth()
            }
          });

    }

}