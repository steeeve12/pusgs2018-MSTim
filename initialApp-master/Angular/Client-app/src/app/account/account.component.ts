import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { RegisterUser } from '../models/user.model';
import { ChangePassword } from '../models/user.model';

import { FileUploader } from 'ng2-file-upload';

import { UserDocument } from '../models/putUserDocument'

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

  resp: string = "";
  private temp: string;

  private document: UserDocument = new UserDocument("","");

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private usersService: UserService, private authService: AuthService) { 
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
      },
      error => {
        console.log(error);
      })
  }

  showChange(){
    //this.change = true;
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
    this.usersService.postChangePassword(changePassword)
    .subscribe(
      data => {
        let ok = data;
        this.change = false;
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
