import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiclesService } from '../services/vehicle-service';
import { RentsService } from '../services/rent-service';
import { Vehicle } from '../models/vehicle.model';
import { Rent } from '../models/rent.model';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import { MapInfo } from '../models/map-info-model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'] //postavljamo sirinu i visinu mape
})
export class VehicleComponent implements OnInit {

  private vehicle: Vehicle;
  private Id: string;
  private reserve: boolean = false;
  private listImages: string[] = [];
  private start: Date;
  private end: Date;
  private rent: Rent;

  mapInfo1: MapInfo;
  mapInfo2: MapInfo;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
    this.mapInfo1 = new MapInfo(45.242268, 19.842954, 
      "assets/ftn.png",
      "Novi Sad" , "" , "");
      this.mapInfo2 = new MapInfo(45.243268, 19.843954, 
        "assets/ftn.png",
        "Novi Sad" , "" , "");
   }

  ngOnInit() {
    this.callGetVehicle();
  }

  placeMarker1($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);

    // this.mapInfo = new MapInfo($event.coords.lat, $event.coords.lng, 
    //   "assets/ftn.png",
    //   "Novi Sad" , "" , "");
    this.mapInfo1.centerLat = $event.coords.lat;
    this.mapInfo1.centerLong = $event.coords.lng;
  }

  placeMarker2($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);

    // this.mapInfo = new MapInfo($event.coords.lat, $event.coords.lng, 
    //   "assets/ftn.png",
    //   "Novi Sad" , "" , "");
    this.mapInfo2.centerLat = $event.coords.lat;
    this.mapInfo2.centerLong = $event.coords.lng;
  }

  callGetVehicle(){
    this.vehiclesService.getVehicle(this.Id)
    .subscribe(
      data => {
        this.vehicle = data;
        this.listImages = this.vehicle.Images.split(";");
        this.listImages.pop();
      },
      error => {
        console.log(error);
      })
  }

  reserveV(){
    this.rent = new Rent(this.start, this.end, -1, -1, +this.Id);
  }

  reserveVehicle(){
    this.reserve = true;
  }

  logged(){
    return localStorage.jwt;
  }
}
