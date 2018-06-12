import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

   getMethod(Id: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`http://localhost:51680/api/Vehicles/GetAll/${Id}`);
  }

  postMethod(newMember): Observable<any> {
    return this.httpClient.post("https://jsonplaceholder.typicode.com/posts", newMember)
  }

}