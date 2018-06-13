import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiclesService } from '../services/vehicle-service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  private vehicle: Vehicle;
  private Id: string;
  items: Array<any> = [];
  private reserve: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]})
   }

  ngOnInit() {
    this.callGetVehicle();
  }

  callGetVehicle(){
    this.vehiclesService.getVehicle(this.Id)
    .subscribe(
      data => {
        this.vehicle = data;
      },
      error => {
        console.log(error);
      })
  }

  reserveVehicle(){
    this.reserve = true;
  }
}
