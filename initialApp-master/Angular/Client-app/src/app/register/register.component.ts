import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RegisterUser } from '../models/user.model'
import { UserService } from '../services/user-service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  private registerUser: RegisterUser; 

  constructor(private usersService: UserService) { }

  ngOnInit() {
    
  }

  onSubmit(user: RegisterUser) {
    if(user.Password == user.ConfirmPassword){
      this.usersService.postMethod(user)
      .subscribe(
        data => {
          this.registerUser = data;
        },
        error => {
          console.log(error);
        })
    }
  }
}
