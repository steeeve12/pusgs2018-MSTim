import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services-service';
import { Service } from '../models/service.model';

import { FileUploader } from 'ng2-file-upload';

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

  private description: string = "";
  private temp: string;

  private retService: Service;
  
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:51680/api/file'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private servicesService: ServicesService) {
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
  }

  addAndUpload(){
    this.added = false;
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

  extractGrade(){
    let arr = this.services.forEach(obj => {
      obj.Impressions.forEach(childObj => {
        this.grade += childObj.Grade;
        this.cnt += 1;
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
          this.castAndClear();
        },
        error => {
          console.log(error);
        })
  }

  //   this.servicesService.postMethod(newMember)
  //   .subscribe(
  //     data => {
  //       this.service = data;
  //       alert("POST: id: " + this.service.Id);
  //     },
  //     error => {
  //       console.log(error);
  //     })
  // }
}
