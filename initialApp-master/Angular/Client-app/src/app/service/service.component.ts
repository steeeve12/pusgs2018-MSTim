import { Component, OnInit } from '@angular/core';
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

import { TruncateModule } from 'ng2-truncate';
import { Dictionary, ImplicitPartial } from 'lodash';
import { RegisterUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  private Id: string = "-1";
  private retVehicle: Vehicle;
  private vehicles: Vehicle[];
  private vehicleTypes: VehicleType[];
  private impressions: Impression[];
  private Ind: string = "1";
  private pages: number;
  private numbers: number[];
  private pageNum: number;
  private resp: string[] = [];
  private temp: string;
  private description: string = "";
  private listImages: string[] = [];
  private postImpression: Impression = new Impression("", 0, new RegisterUser("", "", null, "", ""));

  private service: Service;
  private grade: number = 0;
  private cnt: number = 0;
  private comment: string = "";

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private impressionService: ImpressionService, private router: Router, private activatedRoute: ActivatedRoute, private vehiclesService: VehiclesService, private vehicleTypesService: VehicleTypesService, private servicesService: ServicesService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]}); 
    this.uploader.onCompleteItem = (item:any, response:string, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status);
      if(response == "Please Upload image of type .jpg,.gif,.png,.jpeg." || response == "Please Upload a file upto 1 mb." || response == "Please Upload a image." || response == "some Message"){
        
      }
      else if(response == ""){
        this.resp = [];
      }
      else{
        this.temp = response.replace('"', "");
        this.temp = this.temp.replace('"', "");
        this.resp.push(this.temp)};
      }
  }

  ngOnInit() {
    this.callGetVehicles();
    this.callGetVehicleTypes();
    this.callGetServices();
    this.callGetImpressions();
    this.pageNum = 1;
  }

  castAndClear(){
    this.resp = [];
    this.uploader.clearQueue();
  }  

  callGetVehicles(){
    this.vehiclesService.getVehicles(this.Id, this.Ind)
      .subscribe(
        data => {
          this.vehicles = data;
          this.pages = Math.ceil((this.vehicles.length)/9);
          this.numbers = Array.from(new Array(this.pages),(val,index)=>index+1);

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
          this.pages = Math.ceil((this.impressions.length)/9);
          this.numbers = Array.from(new Array(this.pages),(val,index)=>index+1);

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
    this.cnt = 0;
    this.grade = 0;

    let arr = this.impressions.forEach(obj => {
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
      alert("You must fill all the fields provided and select at least one image!");
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
}
