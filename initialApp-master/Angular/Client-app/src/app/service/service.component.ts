import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesService } from '../services/vehicle-service';
import { Vehicle } from '../models/vehicle.model'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  private Id: string = "-1";
  private vehicles: Vehicle[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]}) 
  }

  ngOnInit() {
    this.callGet();
  }

  callGet(){
    this.vehiclesService.getMethod(this.Id)
      .subscribe(
        data => {
          this.vehicles = data;
        },
        error => {
          console.log(error);
        })
  }

}
