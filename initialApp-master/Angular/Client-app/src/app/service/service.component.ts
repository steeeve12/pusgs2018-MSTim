import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesService } from '../services/vehicle-service';
import { ServicesService } from '../services/services-service';
import { Vehicle } from '../models/vehicle.model';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  private Id: string = "-1";
  private vehicles: Vehicle[];
  private Ind: string = "1";
  private pages: number;
  private numbers: number[];
  private pageNum: number;

  private service: Service;
  private grade: number = 0;
  private cnt: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService, private servicesService: ServicesService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]}) 
  }

  ngOnInit() {
    this.callGetVehicles();
    this.callGetServices();
    this.pageNum = 1;
  }

  callGetVehicles(){
    this.vehiclesService.getMethod(this.Id, this.Ind)
      .subscribe(
        data => {
          this.vehicles = data;
          this.pages = Math.ceil((this.vehicles.length)/9);
          this.numbers = Array.from(new Array(this.pages),(val,index)=>index+1);
        },
        error => {
          console.log(error);
        })
  }

  callGetServices(){
    this.servicesService.getService(this.Id)
      .subscribe(
        data => {
          this.service = data;
          this.extractGrade();
          this.grade /= this.cnt;
        },
        error => {
          console.log(error);
        })
  }

  page(page: string){
    if(page == "prev"){
      if(this.pageNum > 1){
        this.Ind = (this.pageNum - 1).toString();
        this.callGetVehicles();
      }
    }
    else if(page == "next"){
      if(this.pageNum < this.pages){
        this.Ind = (this.pageNum + 1).toString();
        this.callGetVehicles();
      }
    }
    else{
      this.Ind = (this.pageNum).toString();
      this.callGetVehicles();
    }
  }

  extractGrade(){
    let arr = this.service.Impressions.forEach(obj => {
      this.grade += obj.Grade;
      this.cnt += 1;
    })
  }

  loggedAndReserved(){
    if(!localStorage.jwt)
      return true;
    //if(ako nije rezervisao)
      //return true;
  }
}
