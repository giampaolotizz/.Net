import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/userdto';
import { PasswordChangeDTO } from 'src/dto/passwordchangedto';

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

  constructor(private service: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.getAll().subscribe(users => this.users = users);
     
  }

  delete(user: UserDTO) {
    this.service.deleteUser(user.login).subscribe(() => this.getUsers());
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

  insert(user: UserDTO, role: String) {
    if (role == "ADMIN"){
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