import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RegisterUser, LoginUser } from '../models/user.model';
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

  getPersonalDocument(email: string): Observable<string>{
    return this.httpClient.get<string>(`http://localhost:51680/api/Account/GetPersonalDocument?email=${email}`)
  }

  getRentAccountId(email: string): Observable<any>{
    return this.httpClient.get(`http://localhost:51680/api/Account/GetRentAccountId?email=${email}`)
  }

  postMethod(newMember): Observable<any> {
    return this.httpClient.post("http://localhost:51680/api/Account/Register", newMember)
  }

  postChangePassword(newMember): Observable<any> {
    return this.httpClient.post("http://localhost:51680/api/Account/ChangePassword", newMember)
  }

  putAddDocument(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutDocumentUser", newMember)
  }

  putMethod(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Account/PutRentUser", newMember)
  }

}
