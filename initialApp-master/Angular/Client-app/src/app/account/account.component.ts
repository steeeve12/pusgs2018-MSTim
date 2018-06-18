import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { RegisterUser, AppUser, UserActivated } from '../models/user.model';
import { ChangePassword } from '../models/user.model';

import { FileUploader } from 'ng2-file-upload';

import { UserDocument } from '../models/user.model'
import { ServicesService } from '../services/services-service';
import { Service } from '../models/service.model';
import { VehicleTypesService } from 'src/app/services/vehicle-type-service';
import { VehicleType } from 'src/app/models/vehicle-type.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private user: RegisterUser;

  private change: boolean = false;
  private added: boolean = false;
  private finished: boolean = false;
  private passChanged: boolean = false;

  resp: string = "";
  private temp: string;

  private document: UserDocument = new UserDocument("","");

  private role: string;

  private users: AppUser[];
  private services: Service[];

  private vehicleTypes: VehicleType[];
  private vehTypeAdded: boolean = false;

  private userActivated: UserActivated = new UserActivated(false, "");
  private documentDenied: UserDocument = new UserDocument("","");

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private usersService: UserService, private authService: AuthService, private servicesService: ServicesService, private vehicleTypesService: VehicleTypesService) { 
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
    this.callGetCurrentUser();
  }

  addAndUpload(){
    this.added = true;
    this.uploader.uploadAll();
  }

  castAndClear(){
    this.resp = "";
    this.added = false;
    this.uploader.clearQueue();
  }  

  uploadDocument(){
    this.document.PersonalDocument = this.resp;
    this.document.Email = localStorage.getItem("currentUserEmail");
    this.usersService.putAddDocument(this.document)
    .subscribe(
      data => {
        let retUserDocument = data;
        this.finished = true;
        this.added = false;
        this.callGetCurrentUser();
      },
      error => {
        console.log(error);
      })
  }

  callGetCurrentUser(){
    this.authService.getCurrentUser(localStorage.getItem("currentUserEmail"))
    .subscribe(
      data => {
        this.user = data;
        this.role = localStorage.getItem("role");

        if(this.role == "Admin"){
          this.usersService.getAllUsers()
          .subscribe(
            data => {
              this.users = data;
            },
            error => {
              console.log(error);
            })
          this.servicesService.getAllServices()
          .subscribe(
            data => {
              this.services = data;
            },
            error => {
              console.log(error);
            })
          this.vehicleTypesService.getVehicleTypes()
          .subscribe(
            data => {
              this.vehicleTypes = data;
            },
            error => {
              console.log(error);
            })
        }
      },
      error => {
        console.log(error);
      })
  }

  showChange(){
    this.change = true;
    this.passChanged = false;
  }

  onSubmit(changePassword: ChangePassword){
    if(changePassword.OldPassword == "" || changePassword.NewPassword == "" || changePassword.ConfirmPassword == ""){
      alert("You must fill all the fields provided!");
      return;
    }
    if(changePassword.NewPassword == changePassword.ConfirmPassword){
      this.changePassword(changePassword);
    }
  }

  changePassword(changePassword: ChangePassword){
    changePassword.Email = localStorage.getItem("currentUserEmail");
    this.usersService.postChangePassword(changePassword)
    .subscribe(
      data => {
        let ok = data;
        this.change = false;
        this.passChanged = true;
      },
      error => {
        console.log(error); 
      })
  }

  acceptUserAccount(){
    this.userActivated.Activated = true;
    this.userActivated.Email = localStorage.getItem("currentUserEmail");

    this.usersService.putUserActivated(this.userActivated)
    .subscribe(
      data => {
        let ok = data;
        this.usersService.getAllUsers()
          .subscribe(
            data => {
              this.users = data;
            },
            error => {
              console.log(error);
            })
      },
      error => {
        console.log(error); 
      })
  }

  denyUserAccount(){
    this.documentDenied.Email = "";
    this.documentDenied.Email = localStorage.getItem("currentUserEmail");

    this.usersService.putUserDenied(this.documentDenied)
    .subscribe(
      data => {
        let ok = data;
        this.usersService.getAllUsers()
          .subscribe(
            data => {
              this.users = data;
            },
            error => {
              console.log(error);
            })
      },
      error => {
        console.log(error); 
      })
  }

  acceptService(service: Service){
    service.Approved = true;

    this.servicesService.putServiceApproved(service)
    .subscribe(
      data => {
        let ok = data;
        this.servicesService.getAllServices()
          .subscribe(
            data => {
              this.services = data;
            },
            error => {
              console.log(error);
            })
      },
      error => {
        console.log(error); 
      })
  }

  denyService(service: Service){
    this.servicesService.deleteService(service.Id)
    .subscribe(
      data => {
        let ok = data;
        this.servicesService.getAllServices()
          .subscribe(
            data => {
              this.services = data;
            },
            error => {
              console.log(error);
            })
      },
      error => {
        console.log(error); 
      })
  }

  onSubmitVehicleType(vehicleType: VehicleType){
    this.vehicleTypesService.postMethod(vehicleType)
    .subscribe(
      data => {
        let ok = data;
        this.vehTypeAdded = true;

        this.vehicleTypesService.getVehicleTypes()
        .subscribe(
          data => {
            this.vehicleTypes = data;
          },
          error => {
            console.log(error);
          })
      },
      error => {
        console.log(error); 
      })
  }

  hide(){
    this.vehTypeAdded = false;
  }

  toggleBan(){

  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }
}