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

  getAllVehicles(Id: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`http://localhost:51680/api/Vehicles?idService=${Id}`);
  }

  getVehicles(Id: string, Ind: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`http://localhost:51680/api/Vehicles?idService=${Id}&pageIndex=${Ind}`);
  }

  getVehicle(Id: string): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(`http://localhost:51680/api/Vehicles?idVehicle=${Id}`);
  }


  postVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>("http://localhost:51680/api/Vehicles", vehicle)
  }

  putVehicleUnavailable(newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Vehicles/PutVehicle", newMember)
  }

  deleteVehicle(Id): Observable<any> {
    return this.httpClient.delete(`http://localhost:51680/api/Vehicles?id=${Id}`);
  }
}