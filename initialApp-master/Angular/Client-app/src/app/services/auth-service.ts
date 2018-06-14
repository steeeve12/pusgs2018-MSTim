import { Injectable } from '@angular/core';

import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginUser } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 constructor(private httpClient: HttpClient) { }

getTheToken(user: LoginUser){

    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');

    if(!localStorage.jwt)
    {
       let x = this.httpClient.post('http://localhost:51680/oauth/token',`username=${user.Username}&password=${user.Password}&grant_type=password`, {"headers": headers}) as Observable<any>

      x.subscribe(
        res => {
          console.log(res.access_token);
          
          let jwt = res.access_token;

          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          let role = decodedJwtData.role

          // console.log('jwtData: ' + jwtData)
          // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
          // console.log('decodedJwtData: ' + decodedJwtData)
          // console.log('Role ' + role) 

          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role);
          localStorage.setItem('currentUser', JSON.stringify({
            token: jwt,
            fullName: name
          }));
        },
        err => {
          console.log("Error occured");
          alert("You are not authenticated!");
        }
      );

      let temp = localStorage.getItem('currentUser');
    }
    
  }
}