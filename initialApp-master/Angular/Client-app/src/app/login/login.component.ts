import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {LoginUser} from '../models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(user: LoginUser, form: NgForm) {
    
  }

}
