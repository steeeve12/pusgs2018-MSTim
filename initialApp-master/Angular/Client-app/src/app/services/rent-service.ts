import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Rent } from '../models/rent.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  constructor(private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

//   getAllServices(): Observable<Service[]> {
//     return this.httpClient.get<Service[]>('http://localhost:51680/api/Services')
//   }

//   getService(id: string): Observable<Service> {
//     return this.httpClient.get<Service>(`http://localhost:51680/api/Services?id=${id}`)
//   }

  postMethod(newMember): Observable<Rent> {
    return this.httpClient.post<Rent>("http://localhost:51680/api/Rents", newMember)
  }

}
