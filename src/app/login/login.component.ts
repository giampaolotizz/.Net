import { Component, OnInit } from '@angular/core';
import { LoginDTO } from 'src/dto/logindto';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { Router } from '@angular/router';
import { Login } from 'src/model/login';
import { DotnetService } from 'src/service/dotnetservice.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDTO: LoginDTO;
  login2: Login;

  constructor(private service: UserService, private router: Router, private dotnet: DotnetService) { }

  ngOnInit() {
  }

  login(f: NgForm): void {
    this.loginDTO = new LoginDTO(f.value.username, f.value.password);
    this.login2 = new Login(f.value.username, f.value.password);

   /* this.service.login(this.loginDTO).subscribe((token:any) => {

      localStorage.setItem("AUTOKEN", JSON.stringify({ "authorities" : token.id_token }));
      console.log(localStorage.getItem("AUTOKEN"));

      
      this.service.userLogged(this.loginDTO.username).subscribe((user:UserDTO)=> {
        
      if (user != null) {
        
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log(localStorage.getItem("currentUser"));
       
        if(user.authorities.indexOf("ROLE_USER") != -1 &&  user.authorities.indexOf("ROLE_ADMIN") != -1 ) {
          this.router.navigate(['/admin-dashboard']);
        } else if(user.authorities.indexOf("ROLE_USER") != -1 ) {
            this.router.navigate(['/user-dashboard']);
          }
        
      } else {
          alert("Wrong username or password");
        }
      });
    });*/

    this.dotnet.login(this.login2).subscribe((token:any) => {

      localStorage.setItem("AUTOKEN", JSON.stringify({ "authorities" : token.id_token }));
      
      this.dotnet.userLogged(this.login2.username).subscribe((user:User)=> {
        
        if (user != null) {
          
          localStorage.setItem("currentUser", JSON.stringify(user));
        
          if (user.Usertype.indexOf("ADMIN") != -1  ) {
            this.router.navigate(['/admin-dashboard']);
          } else {
              this.router.navigate(['/user-dashboard']);
            }
          
        } else {
            alert("Wrong username or password");
          }
      });
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
