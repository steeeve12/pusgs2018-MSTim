import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiclesService } from '../services/vehicle-service';
import { Vehicle } from '../models/vehicle.model';

import { FileUploader } from 'ng2-file-upload';

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
  private resp: string;

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]})
    this.uploader.onCompleteItem = (item:any, response:string, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item, status);
        this.resp = response.replace('"', "")
        this.resp = this.resp.replace('"', "")};
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

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
