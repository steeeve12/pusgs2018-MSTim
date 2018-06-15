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
import { UserService } from 'src/app/services/user-service';
import { UserRent } from '../models/putUserRent'

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
  private reserved: boolean = false;
  private listImages: string[] = [];
  private start: Date;
  private end: Date;
  private rent: Rent;
  private branches: Branch[];
  private branch1: Branch;
  private branch2: Branch;
  private rentBranches: Branch[] = [];
  private markers: Marker[] = [];
  private marker: Marker;
  private lat1: number;
  private lgt1: number;
  private lat2: number;
  private lgt2: number;
  private selectedBr1: boolean = false;
  private selectedBr2: boolean = false;
  private member: UserRent = new UserRent("","");

  private retRent: Rent;

  mapInfo1: MapInfo;
  mapInfo2: MapInfo;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService, private branchesService: BranchService, private rentsService: RentsService, private usersService: UserService) {
    activatedRoute.params.subscribe(params => {this.Id = params["vehicleId"], this.serviceId = params["serviceId"]});
    this.mapInfo1 = new MapInfo(45.25800424228705, 19.833547029022156, 
      "assets/ftn.png",
      "Novi Sad" , "" , "");
      this.mapInfo2 = new MapInfo(45.25800424228705, 19.833547029022156, 
        "assets/ftn.png",
        "Novi Sad" , "" , "");
   }

  ngOnInit() {
    this.callGetVehicle();
  }

  placeMarker1($event){
    this.mapInfo1.centerLat = $event.coords.lat;
    this.mapInfo1.centerLong = $event.coords.lng;
  }

  placeMarker2($event){
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

  callGetBranch(lat: number, lgt: number, br: number){
    this.branchesService.getBranch(this.serviceId, lat.toString(), lgt.toString())
    .subscribe(
      data => {
        if(br == 1){
          this.branch1 = data;
        }
        else if(br == 2){
          this.branch2 = data;
        }       
      },
      error => {
        console.log(error);
      })
  }

  callPostBranch(rent: Rent){
    this.rentsService.postMethod(rent)
    .subscribe(
      data => {
        this.retRent = data;
        let em = localStorage.getItem('currentUserEmail');
        this.callPutUserRentId(em);
      },
      error => {
        console.log(error);
      })
  }

  callPutUserRentId(email: string){
    this.member.Id = this.retRent.Id.toString();
    this.member.Email = email;
    this.usersService.putMethod(this.member)
    .subscribe(
      data => {
        let retUserRent = data;
      },
      error => {
        console.log(error);
      })
  }

  reserveV(){
    if(this.end < this.start){
      alert("Start date must be earlier then return date!")
      return;
    }

    this.rent = new Rent(this.start, this.end, this.branch1.Id, this.branch2.Id, +this.Id);

    this.callPostBranch(this.rent);

    this.selectedBr1 = false;
    this.selectedBr2 = false;
    this.reserve = false;
    this.reserved = true;
  }

  reserveVehicle(){
    this.reserve = true;
    this.reserved = false;
    this.callGetBranches();
  }

  markerClick1(lat: number, lgt: number){
      this.lat1 = lat;
      this.lgt1 = lgt;
      this.selectedBr1 = true;
      this.callGetBranch(this.lat1, this.lgt1, 1);
  }

  markerClick2(lat: number, lgt: number){
    this.lat2 = lat;
    this.lgt2 = lgt;
    this.selectedBr2 = true;
    this.callGetBranch(this.lat2, this.lgt2, 2);
}

  logged(){
    return localStorage.jwt;
  }
}
