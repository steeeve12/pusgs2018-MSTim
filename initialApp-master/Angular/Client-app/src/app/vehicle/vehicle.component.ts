import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  private rent: Rent;
  private rents: Rent[] = [];
  private userDocument: string;
  private userRentAccountId: number;
  private branches: Branch[];
  private branch1: Branch = null;
  private branch2: Branch = null;
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

  temp = new Date();
  minDate = new Date(this.temp.getFullYear(), this.temp.getMonth(), this.temp.getDate());
  maxDate = new Date(2030, 1, 1);

  private invalidDates: {[id: string] : boolean} = {};
  private start = new FormControl(new Date());
  private end = new FormControl(new Date());
  private tempS: Date;
  private tempE: Date;

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

  dateFilter = (d: Date): boolean => {
    // Using a JS Object as a lookup table of valid dates
    // Undefined will be falsy.
    return !this.invalidDates[d.toISOString().split("T")[0]];  // daje za jedan vise dan od valid dates
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

  callPostRent(rent: Rent){
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

  callPutVehicleUnavailable(){
    this.vehicle.Unavailable = true;
    this.vehiclesService.putVehicleUnavailable(this.vehicle)
    .subscribe(
      data => {
        let ret = data;
      },
      error => {
        console.log(error);
      })
  }

  callGetRents(vehicelId: number){
    this.rentsService.getRents(vehicelId.toString())
    .subscribe(
      data => {
        this.rents = data;

        let dateArray = [];

        this.rents.forEach(obj => {
          this.tempS = new Date(obj.Start);
          this.tempE = new Date(obj.End);

          // let today = new Date();

          // if(this.tempS != today){
          //   let i = this.tempS.getDate() % 2;
          //   if(i !== 0){ 
          //     this.tempS.setDate(this.tempS.getDate() - 1); // nekako ga prikazuje za dan vise kad se odradi toJSON za neparne, a parne ne treba...
          //     this.tempE.setDate(this.tempE.getDate() - 1);
          //   }
          // }
          // else{
          //   if(this.tempS.getDate() % 2 != 0){ 
          //     this.tempE.setDate(this.tempE.getDate() - 1);
          //   }
          // }

          let currentDate = new Date(this.tempS);

          while (currentDate <= this.tempE) {
            let p = currentDate.toJSON().split("T")[0];
            dateArray.push(p);
            currentDate.setDate(currentDate.getDate() + 1);
          }

          dateArray.forEach(childObj => {
            this.invalidDates[childObj] = true;
          })
        })
      },
      error => {
        console.log(error);
      })
  }

  reserveV(){
    // if(){ // korisnik ima dokument

    // }
    // if(){ // korisnik vec rezervisao vozilo

    // }
    
    if(this.start.value == undefined || this.end.value == undefined || this.branch1 == null || this.branch2 == null){
      alert("You must select the dates and the branches!")
      return;
    }
    if(this.end.value < this.start.value){
      alert("Start date must be earlier then return date!")
      return;
    }

    this.start.value.setDate(this.start.value.getDate() + 1); // ne znam zasto smanjuje i povecava za jedan... ovako ga vratim kako je selektovano
    this.end.value.setDate(this.end.value.getDate() + 1);

    this.rent = new Rent(this.start.value.toISOString().split("T")[0], this.end.value.toISOString().split("T")[0], this.branch1.Id, this.branch2.Id, +this.Id);

    this.isReserved(); // da li je vozilo rezervisano
  }

  isReserved(){
    this.rentsService.getTryReserve(this.rent)
    .subscribe(
      data => {
        if(data == true){
          this.callPostRent(this.rent);
          this.reserved = true;
          this.reserve = false;
        }
        else{
          alert("This vehicle is already rented for that period");
          this.reserved = false;
          this.reserve = false;
        }
      },
      error => {
        console.log(error); 
      })
  }

  reserveVehicle(){
    this.reserve = true;
    this.reserved = false;
    this.callGetBranches();
    this.callGetRents(this.vehicle.Id);
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
