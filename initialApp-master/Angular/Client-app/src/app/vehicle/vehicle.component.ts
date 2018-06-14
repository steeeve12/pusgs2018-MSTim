import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiclesService } from '../services/vehicle-service';
import { RentsService } from '../services/rent-service';
import { BranchService } from '../services/branch-service';
import { Vehicle } from '../models/vehicle.model';
import { Rent } from '../models/rent.model';

import { MapInfo } from '../models/map-info-model';
import { Branch } from '../models/branch.model';
import { Marker } from '../models/marker-model';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'] //postavljamo sirinu i visinu mape
})
export class VehicleComponent implements OnInit {

  private vehicle: Vehicle;
  private Id: string;
  private serviceId: string;
  private reserve: boolean = false;
  private listImages: string[] = [];
  private start: Date;
  private end: Date;
  private rent: Rent;
  private branches: Branch[];
  private markers: Marker[] = [];
  private marker: Marker;
  private lat: number;
  private lgt: number;

  mapInfo1: MapInfo;
  mapInfo2: MapInfo;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService, private branchesService: BranchService) {
    activatedRoute.params.subscribe(params => {this.Id = params["vehicleId"], this.serviceId = params["serviceId"]});
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

  callGetBranches(){
    this.branchesService.getBranches(this.serviceId)
    .subscribe(
      data => {
        this.branches = data;
        this.branches.forEach(obj => {
          this.marker = new Marker(obj.Latitude, obj.Longitude);
          this.markers.push(this.marker);
        })
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
    this.callGetBranches();
  }

  marker1(lat: number, lgt: number){

  }

  marker2(lat: number, lgt: number){

  }

  logged(){
    return localStorage.jwt;
  }
}
