import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesService } from '../services/vehicle-service';
import { ServicesService } from '../services/services-service';
import { Vehicle } from '../models/vehicle.model';
import { Service } from '../models/service.model';
import { Impression } from '../models/impression.model';
import { ImpressionService } from '../services/impression-service';
import { VehicleTypesService } from '../services/vehicle-type-service';

import { FileUploader } from 'ng2-file-upload';
import { VehicleType } from '../models/vehicle-type.model';

import { RegisterUser } from 'src/app/models/user.model';
import { Branch } from '../models/branch.model';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';

import { MapInfo } from '../models/map-info-model';
import { Marker } from '../models/marker-model';
import { BranchService } from '../services/branch-service';
import { RentsService } from '../services/rent-service';
import { Rent } from '../models/rent.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'], //postavljamo sirinu i visinu mape
})
export class ServiceComponent implements OnInit {

  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;

  private Id: string = "-1";
  private retVehicle: Vehicle;
  private vehicles: Vehicle[];
  private allVehicles: Vehicle[];
  private vehicleTypes: VehicleType[];
  private impressions: Impression[];
  private Ind: string = "1";
  //private pages: number;
  private numbers: number[];
  //private pageNum: number;
  private resp: string[] = [];
  private resp2: string;
  private temp: string;
  private temp2: string;
  private description: string = "";
  private listImages: string[] = [];
  private postImpression: Impression = new Impression("", 0, new RegisterUser("", "", null, "", "", "", false));

  private service: Service;
  private grade: number = 0;
  private cnt: number = 0;
  private comment: string = "";

  private added: boolean = false;
  private added2: boolean = false;

  private firstRentEnded: boolean = false;

  mapInfo: MapInfo;
  private lat: number = -1;
  private lgt: number = -1;

  private branches: Branch[];
  private branches1: Branch[];
  private branch: Branch = new Branch(0, "", "", 0, 0);
  private markers: Marker[] = [];
  private marker: Marker;
  private tempMarker: Marker = new Marker(0, 0);
  private address: string;

  private rents: Rent[];

  private modelSearch: string;
  private manufactorSearch: string;
  private yearSearch: number;
  private pricePerHourSearch: number;
  private vehicleTypeSearch: string;

  private p1 = 1;

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public uploader2:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private impressionService: ImpressionService, private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService, 
    private vehicleTypesService: VehicleTypesService, private servicesService: ServicesService, private branchesService: BranchService, private rentsService: RentsService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]}); 
    this.uploader.onCompleteItem = (item:any, response:string, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status);
      if(response == "Please Upload image of type .jpg,.gif,.png,.img,.jpeg." || response == "Please Upload a file upto 1 mb." || response == "Please Upload a image." || response == "some Message"){
        
      }
      else if(response == ""){
        this.resp = [];
      }
      else{
        this.temp = response.replace('"', "");
        this.temp = this.temp.replace('"', "");
        this.resp.push(this.temp)
      };
    }

    this.uploader2.onCompleteItem = (item:any, response:string, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status);
      if(response == "Please Upload image of type .jpg,.gif,.png,.img,.jpeg." || response == "Please Upload a file upto 1 mb." || response == "Please Upload a image." || response == "some Message"){
          
      }
      else if(response == ""){
        this.resp2 = "";
      }
      else{
        this.temp2 = response.replace('"', "");
        this.temp2 = this.temp2.replace('"', "");
        this.resp2 = this.temp2;
      };
    }

    this.mapInfo = new MapInfo(45.25800424228705, 19.833547029022156, 
      "assets/ftn.png",
      "Novi Sad" , "" , "");
  }

  ngOnInit() {
    this.callGetAllVehicles();
    this.callGetVehicles();
    this.callGetVehicleTypes();
    this.callGetServices();
    this.callGetImpressions();
    this.callGetBranches();
    this.getServiceBranches();
    this.getUserRents();
  }

  placeMarker($event){
    this.tempMarker.Lat = $event.coords.lat;
    this.tempMarker.Lgt = $event.coords.lng;
    this.lat = $event.coords.lat;
    this.lgt = $event.coords.lng;
  }

  addAndUpload(){
    this.added = false;
    this.uploader.uploadAll();
  }

  castAndClear(){
    this.resp = [];
    this.uploader.clearQueue();
  }  

  addAndUpload2(){
    this.added = false;
    this.uploader2.uploadAll();
  }

  castAndClear2(){
    this.resp2 = "";
    this.uploader2.clearQueue();
  }  

  callGetAllVehicles(){
    this.vehiclesService.getAllVehicles(this.Id)
      .subscribe(
        data => {
          this.allVehicles = data;
          //this.pages = Math.ceil((this.vehicles.length)/9);
          //this.numbers = Array.from(new Array(this.pages),(val,index)=>index+1);
          //if(this.numbers.length == 0){
          //  this.numbers.push(1);
          //}
        },
        error => {
          console.log(error);
        })
  }

  callGetVehicles(){
    this.vehiclesService.getVehicles(this.Id, this.Ind)
      .subscribe(
        data => {
          this.vehicles = data;
          //this.pages = Math.ceil((this.vehicles.length)/9);
          //this.numbers = Array.from(new Array(this.pages),(val,index)=>index+1);
          //if(this.numbers.length == 0){
          //  this.numbers.push(1);
          //}

          this.vehicles.forEach(obj => {
            this.listImages.push(obj.Images.split(";")[0]);
          })
        },
        error => {
          console.log(error);
        })
  }

  callGetVehicleTypes(){
    this.vehicleTypesService.getVehicleTypes()
    .subscribe(
      data => {
        this.vehicleTypes = data;
      },
      error => {
        console.log(error);
      })
  }

  callGetImpressions(){
    this.impressionService.getMethod(this.Id)
      .subscribe(
        data => {
          this.impressions = data;
          this.comment = "";
          this.extractGrade();
          this.grade /= this.cnt;
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
          // ovo radim u onSubmit(imp: Impression) 
      //    this.extractGrade();
      //    this.grade /= this.cnt;
        },
        error => {
          console.log(error);
        })
  }

  callGetBranches(){
    this.branchesService.getAllBranches()
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

  onChange($event){
    this.p1 = $event;
    this.Ind = this.p1.toString();
    this.listImages = [];
    this.callGetVehicles();
  }

  // page(page: string){
  //   if(page == "prev"){
  //     if(this.pageNum > 1){
  //       this.Ind = (this.pageNum - 1).toString();
  //       this.callGetVehicles();
  //     }
  //   }
  //   else if(page == "next"){
  //     if(this.pageNum < this.pages){
  //       this.Ind = (this.pageNum + 1).toString();
  //       this.callGetVehicles();
  //     }
  //   }
  //   else{
  //     this.Ind = (this.pageNum).toString();
  //     this.callGetVehicles();
  //   }
  // }

  extractGrade(){
    this.cnt = 0;
    this.grade = 0;

    let arr = this.impressions.forEach(obj => {
      this.grade += obj.Grade;
      this.cnt += 1;
    })
  }

  logged(){
    return localStorage.jwt;
  }

  

  onSubmit(imp: Impression) {
    if(!imp){
      alert("Impression is NULL!");
      return;
    }

    if(imp.Comment == ""){
      imp.Comment = "__empty__";
    }

    imp.Comment = imp.Comment.trim();

    imp.Comment = this.Id.toString() + "#" + imp.Comment;

    this.postImpression.Grade = imp.Grade;
    this.postImpression.Comment = imp.Comment;
    this.postImpression.AppUser.Email = localStorage.getItem('currentUserEmail');
    this.postImpression.AppUser.FullName = "__empty__";
    
    if(this.postImpression.Grade < 1 || this.postImpression.Grade > 5){
      alert("Impression grade is out of range!");
      return;
    }

    this.impressionService.postMethod(this.postImpression)
    .subscribe(
      data => {
        this.callGetImpressions();
      },
      error => {
        console.log(error);
        alert(error.error.Message);
      })
  }

  onSubmitVehicle(fvehicle: Vehicle){
    fvehicle.Manufactor = fvehicle.Manufactor.trim();
    fvehicle.Model = fvehicle.Model.trim();
    fvehicle.Description = this.description;
    fvehicle.Images = "";
    this.resp.forEach(obj => {
      fvehicle.Images += obj;
      fvehicle.Images += ";";
    })
 
    fvehicle.VehicleTypeId = this.vehicleTypes.find(veh => veh.Name == fvehicle.Type).Id;

    if(fvehicle.Manufactor == "" || fvehicle.Model == "" || (!fvehicle.Year) || fvehicle.Images.length == 0 || fvehicle.PricePerHour == undefined || fvehicle.Type == ""){
      alert("You must fill all the fields provided!");
      return;
    }

    if(fvehicle.Description == ""){
      fvehicle.Description = "__empty__";
    }

    fvehicle.Description =  this.Id.toString() + "#" + fvehicle.Description;

    if(fvehicle.Year < 1970 || fvehicle.Year > 2018){
      alert("Year must be between 1970. and 2018.");
      return;
    }
      this.vehiclesService.postVehicle(fvehicle)
      .subscribe(
        data => {
          this.retVehicle = data;
          this.listImages = [];
          this.callGetVehicles();
          this.added = true;
          this.resp = [];
          this.castAndClear();
        },
        error => {
          console.log(error);
        })
  }

  addBranch(){
    if(this.address == "" || this.resp2 == "" || this.lat < 0 || this.lat == undefined || this.lgt < 0 || this.lgt == undefined){
      alert("You must fill in the address and select a place on the map!")
      return;
    }

    if(this.address == ""){
      this.address = "__empty__";
    }

    this.branch.Picture = this.resp2;
    this.branch.Address = this.Id.toString() + "#" + this.address;
    this.branch.Latitude = this.lat;
    this.branch.Longitude = this.lgt;

    this.branchesService.postMethod(this.branch)
    .subscribe(
      data => {
        let br = data;
        this.added2 = true;
        this.resp2 = "";
        this.castAndClear2();
        this.getServiceBranches();
      },
      error => {
        console.log(error);
      })
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  removeVehicle(id: string){
    this.vehiclesService.deleteVehicle(id)
    .subscribe(
      data => {
        this.callGetVehicles();
      },
      error => {
        console.log(error);
        alert(error.error.Message);        
      })
  }

  removeBranch(id: string){
    this.branchesService.deleteBranch(id)
    .subscribe(
      data => {
        this.getServiceBranches();
      },
      error => {
        console.log(error);
        alert(error.error.Message);        
      })
  }

  getServiceBranches(){
    this.branchesService.getBranches(this.Id).subscribe(
      data1 => {
        this.branches1 = data1;
      },
      error => {
        console.log(error);
        alert(error.error.Message);        
      })
  }

  getUserRents(){
    this.rentsService.getIsFirstRentEnded(localStorage.getItem('currentUserEmail'))
    .subscribe(
      data => {
        this.firstRentEnded = data;
      },
      error => {
        console.log(error);
        alert(error.error.Message);        
      })
  }
}
