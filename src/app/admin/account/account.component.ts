import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/userdto';
import { NgForm } from '@angular/forms';
import { PasswordChangeDTO } from 'src/dto/passwordchangedto';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: UserDTO;
  changeP: PasswordChangeDTO;
  seeModal = false;
  tableUp = false;
 

  constructor(private service: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.getUser();    
  }

  getUser() {
    this.service.readUsername(this.user.login).subscribe(() => this);
  }

  update(user: UserDTO) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.service.update(user).subscribe(() => this.getUser());
  }

  changePassword(f: NgForm): void{
    this.changeP = new PasswordChangeDTO(f.value.oldP, f.value.newP);
    this.service.updatePassword(this.changeP);
    this.seeModal = false;
  }

  showModal() {
    this.seeModal = true;
    this.tableUp = true;
  }

  closeModal() {
    this.seeModal = false;
    this.tableUp = false;
  }

}
