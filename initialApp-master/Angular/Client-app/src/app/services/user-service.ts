import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RegisterUser, LoginUser, AppUser } from '../models/user.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  // getMethod(): Observable<RegisterUser[]> {
  //  return this.httpClient.get<RegisterUser[]>('http://localhost:51680/api/Services')
  //}

  getAllUsers(): Observable<AppUser[]>{
    return this.httpClient.get<AppUser[]>(`http://localhost:51680/api/Account/GetAllUsers`)
  }

  getAllManagers(): Observable<AppUser[]>{
    return this.httpClient.get<AppUser[]>(`http://localhost:51680/api/Account/GetAllManagers`)
  }

  getPersonalDocument(email: string): Observable<string>{
    return this.httpClient.get<string>(`http://localhost:51680/api/Account/GetPersonalDocument?email=${email}`)
  }

  // getRentAccountId(email: string): Observable<any>{
  //   return this.httpClient.get(`http://localhost:51680/api/Account/GetRentAccountId?email=${email}`)
  // }

  postMethod(newMember): Observable<any> {
    return this.httpClient.post("http://localhost:51680/api/Account/Register", newMember)
  }

  postChangePassword(newMember): Observable<any> {
    return this.httpClient.post("http://localhost:51680/api/Account/ChangePassword", newMember)
  }

  putAddDocument(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutDocumentUser", newMember)
  }

  putUserRentId(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutRentUser", newMember)
  }

  putUserActivated(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutUserActivated", newMember)
  }

  putUserDenied(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutUserDenied", newMember)
  }

  putUserForbidden(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutUserForbidden", newMember)
  }

}
