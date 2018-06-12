import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services-service';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  private services: Service[];
  private grade: number = 0;
  private cnt: number = 0;

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.callGet();
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

  // callPost(){
  //   let newMember = {
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1
  //   };

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
