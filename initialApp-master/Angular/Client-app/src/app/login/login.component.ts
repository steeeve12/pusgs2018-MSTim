import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginUser } from '../models/user.model'
import { AuthService } from '../services/auth-service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUser: LoginUser; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(user: LoginUser, form: NgForm) {
    if(user.Username != "" && user.Password != ""){
      this.authService.getTheToken(user);
    }
    else{
      alert("You have to enter username and password!");
      form.reset();
      return false;
    }
  }
}