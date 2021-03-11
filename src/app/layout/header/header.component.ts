import { Component, OnInit } from '@angular/core';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { UserDTO } from 'src/dto/userdto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserDTO = new UserDTO;
  isAdmin = false;
  constructor() { }

  ngOnInit() {
   // this.user = JSON.parse(localStorage.getItem('currentUser'));
   this.getUser();
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.authorities.indexOf("ROLE_ADMIN") != -1){
    this.user.authorities = ["ROLE_ADMIN"];
    this.isAdmin=true;
  }
  }

}
