import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { LoginUser } from '../models/user.model'
import { AuthService } from '../services/auth-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUser: LoginUser; 

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(user: LoginUser, form: NgForm) {
    if(user.Username != "" && user.Password != ""){
      this.authService.getTheToken(user);
      return true;
    }
    else{
      alert("You have to enter username and password!");
      form.reset();
      return false;
    }
  }

}
