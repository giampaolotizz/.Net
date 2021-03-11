import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/userdto';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: UserDTO;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getUser();    
  }

  getUser() {
    this.service.read(this.user.id).subscribe(() => this);
  }

  update(user: UserDTO) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.service.update(user).subscribe(() => this.getUser());
  }

}
