import { Component, OnInit } from '@angular/core';
import { LoginDTO } from 'src/dto/logindto';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { Router } from '@angular/router';
import { UserDTO } from 'src/dto/userdto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDTO: LoginDTO;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(f: NgForm): void {
    this.loginDTO = new LoginDTO(f.value.username, f.value.password);

    this.service.login(this.loginDTO).subscribe((token:any) => {

      localStorage.setItem("AUTOKEN", JSON.stringify({ "authorities" : token.id_token }));
      console.log(localStorage.getItem("AUTOKEN"));

      
      this.service.userLogged(this.loginDTO.username).subscribe((user:UserDTO)=>{
        
      if (user != null) {
        
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log(localStorage.getItem("currentUser"));
       
        if(user.authorities.indexOf("ROLE_USER") != -1 &&  user.authorities.indexOf("ROLE_ADMIN") != -1 ) {
          this.router.navigate(['/admin-dashboard']);
        }
        else if(user.authorities.indexOf("ROLE_USER") != -1 ) {
          this.router.navigate(['/user-dashboard']);
      }
        
      }else{
          alert("Wrong username or password");
        }
      });
    });
    }

  signup() {
    this.router.navigate(['/signup']);
  }
}
