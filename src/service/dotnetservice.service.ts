import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "src/dto/userdto";
import { Login } from "src/model/login";
import { User } from "src/model/user";


@Injectable({
    providedIn: 'root'
  })

export class DotnetService {

    type: string;
    name: string;
    user: User;
    userDto: UserDTO;

    constructor(protected http: HttpClient) {
    }

   
    auth() {
        this.userDto = JSON.parse(localStorage.getItem('Autoken'));
        if (this.userDto) {
          return 'Bearer ' + this.userDto.authorities;
        } else {
          return '';
        }
    }

    getAll(): Observable<User[]> {
      
      return this.http.get<User[]>('http://localhost:8080/services/userService/api/user' , {
        headers: {
          Authorization : this.auth()
        }
      });
    }

    read(id: Number): Observable<User> {
      
      return this.http.get<User>('http://localhost:8080/services/userService/api/user' + '/' + id, {
        headers: {
          Authorization : this.auth()
        }
      });
  }


  delete(id: Number): Observable<any> {
      return this.http.delete<User>('http://localhost:8080/services/userService/api/user' + '/' + id, {
          headers: {
            Authorization : this.auth()
          }
        });
  }


  insert(user: User): Observable<any> {
      return this.http.post<User>('http://localhost:8080/services/userService/api/user', user, {
          headers: {
            Authorization : this.auth()
          }
        });
  }

  update(user: User): Observable<User> {
      return this.http.put<User>('http://localhost:8080/services/userService/api/user', user , {
          headers: {
            Authorization : this.auth()
          }
        });

  }

  login(login: Login): Observable<UserDTO> {
    return this.http.post<any>('http://localhost:8080/services/userService/api/login',login)
  }

  userLogged(username: string) { 
    return this.http.get('http://localhost:8080/services/userService/api/user/' + username, {     
    headers: {
        Authorization: this.auth()
      }
    });
  }   

}