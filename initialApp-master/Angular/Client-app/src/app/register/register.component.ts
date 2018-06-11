import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import {RegisterUser} from '../models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    
  }

  onSubmit(user: RegisterUser, form: NgForm) {
    
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');

    let x = this.httpClient.post('http://localhost:51680/api/Account/Register',`username=admin&password=admin&grant_type=password`, {"headers": headers}) as Observable<any>

  }
}
