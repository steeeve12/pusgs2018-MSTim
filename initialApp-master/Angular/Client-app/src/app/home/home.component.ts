import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services-service';
import { Service } from '../models/service.model';

import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/services/user-service';
import { AuthService } from 'src/app/services/auth-service';
import { RegisterUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  private services: Service[];
  private grade: number = 0;
  private cnt: number = 0;

  private resp: string = "";

  private added: boolean = false;
  private added2: boolean = false;
  private seeAddService: boolean = false;
  private seeModifyService: boolean = false;

  private description: string = "";
  private temp: string;

  private retService: Service;
  private mService: Service;

  private p1 = 1;

  private user: RegisterUser = new RegisterUser("","", null, "", "", "", false);
  
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private servicesService: ServicesService, private authService: AuthService) {
    this.uploader.onCompleteItem = (item:any, response:string, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status);
      if(response == "Please Upload image of type .jpg,.gif,.png,.img,.jpeg." || response == "Please Upload a file upto 1 mb." || response == "Please Upload a image." || response == "some Message"){
        
      }
      else if(response == ""){
        this.resp = "";
      }
      else{
        this.temp = response.replace('"', "");
        this.temp = this.temp.replace('"', "");
        this.resp = this.temp;
      }
    }
   }

  ngOnInit() {
    this.callGet();
    this.callGetUser();
  }

  addAndUpload(){
    this.added = false;
    this.added2 = false;
    this.uploader.uploadAll();
  }

  castAndClear(){
    this.resp = "";
    this.uploader.clearQueue();
  }

  callGet(){
    this.servicesService.getAllServices()
      .subscribe(
        data => {
          this.services = data;
          this.extractGrade();
          this.grade /= this.cnt;
        },
        error => {
          console.log(error);
        })
  }

  callGetUser(){
    this.authService.getCurrentUser(localStorage.getItem("currentUserEmail"))
    .subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      })
  }

  extractGrade(){
    this.grade = 0;
    this.services.forEach(obj => {
      obj.Impressions.forEach(childObj => {
        if(childObj.Grade != 0){
          this.grade += childObj.Grade;
          this.cnt += 1;
        }
      })
      obj.Grade = this.grade/this.cnt;
      this.grade = 0;
      this.cnt = 0;
    })
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  onSubmit(fservice: Service){
    fservice.Email = fservice.Email.trim();
    fservice.Name = fservice.Name.trim();
    fservice.Description = this.description;
    fservice.Grade = 0;
    fservice.Impressions = [];
    fservice.Approved = false;
    fservice.Logo = this.resp;
    fservice.Creator = this.user;

    if(fservice.Email == "" || fservice.Name == "" || fservice.Description == "" || fservice.Logo == ""){
      alert("You must fill all the fields provided!");
      return;
    }

      this.servicesService.postMethod(fservice)
      .subscribe(
        data => {
          this.retService = data;
          this.callGet();
          this.added = true;
          this.seeAddService = false;
          this.castAndClear();
        },
        error => {
          console.log(error);
        })
  }

  toggleAddService(){
    this.added = false;
    this.seeAddService = true;
    this.seeModifyService = false;
  }

  onChange($event){
    this.p1 = $event;
  }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }

  
  logged(){
    if(localStorage.jwt)
      return true;
    else
      return false;
  }

  removeService(id: string){
    this.servicesService.deleteService(id)
    .subscribe(
      data => {
        this.callGet();
      },
      error => {
        console.log(error);
        alert(error.error.Message);
      })
  }

  toggleModifyService(service: Service){
    this.seeModifyService = true;
    this.seeAddService = false;
    this.mService = service;
  }

  onSubmitModify(){
    this.mService.Email = this.mService.Email.trim();
    this.mService.Name = this.mService.Name.trim();
    this.added2 = false;
    this.mService.Approved = false;
    this.mService.Creator = this.user;

    if(this.mService.Email == "" || this.mService.Name == "" || this.mService.Description == ""){
      alert("You must fill all the fields provided!");
      return;
    }

    if(this.resp){
      this.mService.Logo = this.resp;
    }

      this.servicesService.putService(this.mService)
      .subscribe(
        data => {
          let ok = data;
          this.servicesService.getAllServices()
            .subscribe(
              data => {
                this.services = data;
                this.added2 = true;
                this.seeModifyService = false;
                this.castAndClear();
              },
              error => {
                console.log(error);
              })
        },
        error => {
          console.log(error); 
        })
  }
}
