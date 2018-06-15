import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RegisterUser, LoginUser } from '../models/user.model'
import { UserService } from '../services/user-service'
import { AuthService } from '../services/auth-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  private registerUser: RegisterUser; 
  private loginUser: LoginUser = new LoginUser("", ""); 

  constructor(private authService: AuthService, private usersService: UserService, private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit(user: RegisterUser) {
    user.FullName = user.FullName.trim();
    user.Email = user.Email.trim();

    if(user.FullName == "" || user.Email == "" || user.Password == "" || (!user.Birthday) || user.ConfirmPassword == ""){
      alert("You must fill all the fields provided!");
      return;
    }
    if(user.Password == user.ConfirmPassword){
      this.usersService.postMethod(user)
      .subscribe(
        data => {
          this.registerUser = data;
          this.loginUser.Username = user.Email;
          this.loginUser.Password = user.Password;
          this.authService.getTheToken(this.loginUser);
        },
        error => {
          console.log(error);
          alert(error.error.ModelState["model.Email"] + "\n" + error.error.ModelState["model.Password"]);
        })
       
    }else{
      alert("Password does not match the confirm password!");
      return;
    }    
  }
  
}
