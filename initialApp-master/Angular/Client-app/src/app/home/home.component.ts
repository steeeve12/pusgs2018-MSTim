import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services-service';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private services: Service[]; 

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.callGet();
  }

  callGet(){
    this.servicesService.getMethod()
      .subscribe(
        data => {
          this.services = data;
        },
        error => {
          console.log(error);
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
