import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginDTO } from "src/dto/logindto";
import { UserDTO } from "src/dto/userdto";
import { UserService } from "src/service/user.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent implements OnInit {
  
    userDTO: UserDTO= new UserDTO();
    loginDTO : LoginDTO;
    chiave : string;
  
    constructor(private service: UserService, private router: Router) { }
  
    ngOnInit() {
    }
  
    insert(f: NgForm): void {
      this.userDTO.login = f.value.username;
      this.userDTO.email = f.value.mail;
      this.userDTO.password = f.value.password;

  
      this.service.login(this.loginDTO).subscribe((token : any) => {
              
        localStorage.setItem("AUTOKEN", JSON.stringify({ "authorities": token.id_token }));
      
          this.service.register(this.userDTO).subscribe( (u)=> {
        
            this.chiave = u.activationKey;
      
           this.prova(this.chiave)  
        });
      }, undefined, ()=> {
         localStorage.clear()
         this.router.navigateByUrl('');
      });
    }
  
    prova(chiave:string) {  
      this.service.activate(chiave).subscribe();  
    }

    toLogin() {
      this.router.navigate(['/login']);
    }
  }