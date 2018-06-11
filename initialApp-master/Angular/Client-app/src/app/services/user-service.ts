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

   getMethod(): Observable<RegisterUser[]> {
    return this.httpClient.get<RegisterUser[]>('https://jsonplaceholder.typicode.com/posts/1')
  }

  postMethod(newMember): Observable<any> {
    return this.httpClient.post("https://jsonplaceholder.typicode.com/posts", newMember)
  }

}
