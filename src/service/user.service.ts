import { Injectable } from '@angular/core';
import { UserAbstractService } from './userabstractservice.service';
import { UserDTO } from '../dto/userdto';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../dto/logindto';
import { Observable } from 'rxjs';
import { PasswordChangeDTO } from 'src/dto/passwordchangedto';

/**
 * Classe che contiene i metodi di servizi per l'utente
 * 
 * @author Francesco, Gianni, Marco
 *
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends UserAbstractService<UserDTO, Number>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'users';
  }

  auth() {
    this.user = JSON.parse(localStorage.getItem('AUTOKEN'));
    if (this.user) {
      console.log('Bearer ' + this.user.authorities);
      return 'Bearer ' + this.user.authorities;
    } else {
      console.log('porco dio');
      return '';
    }
}

  login(loginDTO: LoginDTO): Observable<UserDTO> {
    return this.http.post<any>('http://localhost:8080/api/authenticate',loginDTO)
  }

  
userLogged(username: string) {
 
  return this.http.get('http://localhost:8080/api/users/' + username, {
   
  headers: {
      Authorization: this.auth()
    }
  });
}

register(dto: UserDTO): Observable<any> {

  return this.http.post<UserDTO>('http://localhost:8080/api/register',dto, {
  headers: {
    Authorization: this.auth()
  }
});
    
}
  
activate(activationkey : string) {

   return this.http.get('http://localhost:8080/api/activate?key='+activationkey );
      
  }

updatePassword(password : PasswordChangeDTO){
  console.log(password);
  this.http.post<PasswordChangeDTO>('http://localhost:8080/api/account/change-password', password, {
    headers: {
      Authorization : this.auth()
    }
  });
}


}
