import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { VehicleType } from '../models/vehicle-type.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {

  constructor(private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  getVehicleType(Id: string): Observable<VehicleType> {
    return this.httpClient.get<VehicleType>(`http://localhost:51680/api/VehicleTypes?id=${Id}`);
  }

  postMethod(newMember): Observable<any> {
    return this.httpClient.post("https://jsonplaceholder.typicode.com/posts", newMember)
  }

}