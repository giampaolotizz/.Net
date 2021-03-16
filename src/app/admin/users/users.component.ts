import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import {DotnetService } from 'src/service/dotnetservice.service';
import { UserDTO } from 'src/dto/userdto';
import { User } from 'src/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserDTO[];
  usertoinsert: UserDTO = new UserDTO();
  moveButton = "Insert";
  seeTable = true;
  role = '';
  usersDot : User[];

  constructor(private service: UserService, private dotnet: DotnetService) { }

  ngOnInit() {
    //this.getUsers();
    this.getUsers2();
  }

  getUsers() {
    this.service.getAll().subscribe(users => this.users = users);
     
  }

  getUsers2() {
    this.dotnet.getAll().subscribe(users => this.usersDot = users);
     
  }

  delete(user: UserDTO) {
    this.service.deleteUser(user.login).subscribe(() => this.getUsers());
  }

  delete2(id: Number) {
    this.dotnet.delete(id).subscribe(() => this.getUsers2());
  }

  update(user: UserDTO, role: String) {
    user.authorities = [];
    if (role == "ADMIN"){
      user.authorities.push("ROLE_ADMIN");
      user.authorities.push("ROLE_USER");
    } else{
      user.authorities.push("ROLE_USER");
    }
    console.log(user);
    this.service.update(user).subscribe(() => this.getUsers());
    this.role = '';
  }

  update2(user: User) {
    this.dotnet.update(user).subscribe(() => this.getUsers2());
  }

  insert(user: UserDTO, role: String) {
    if (role == "ADMIN") {
      user.authorities.push("ROLE_ADMIN");
      user.authorities.push("ROLE_USER");
      console.log(this.getRole(user))
    } else {
      user.authorities.push("ROLE_USER");
      console.log(this.getRole(user))
    }
    this.service.insert(user).subscribe(() => this.getUsers());
    this.clear();
    this.seeTable = true;
    this.moveButton = "Insert";
  }

  insert2(user: User) {
   this.dotnet.insert(user).subscribe(() => this.getUsers2());
  }

  clear(){
    this.usertoinsert = new UserDTO();
    this.role = '';
  }

  showInsertForm() {
    if (this.seeTable === true) {
      this.seeTable = false;
      this.moveButton = "To Table";
    } else { 
      this.seeTable = true; 
      this.moveButton = "Insert";
    }
  }

  getRole(user: UserDTO = new UserDTO()) {
    if (user.authorities.includes("ROLE_ADMIN")) {
      this.role="ADMIN";
    } else {
      this.role="USER";
    }
  }
}