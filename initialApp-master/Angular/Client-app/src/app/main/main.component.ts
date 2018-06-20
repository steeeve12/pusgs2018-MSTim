import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user-service';
import { ServicesService } from '../services/services-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isConnected: Boolean;
  accountNotifications: string;
  serviceNotifications: string;

  constructor(private notifService: NotificationService, private ngZone: NgZone, private authService: AuthService, private servicesService: ServicesService) {
    this.isConnected = false;
    this.accountNotifications = "0";
    this.serviceNotifications = "0";
   }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForAccountNotifications();
    this.subscribeForServiceNotifications();
    this.subscribeForAllNotifications();
    //this.subscribeForTime();
  }

  private checkConnection(){
    this.notifService.connectionEstablished.subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notifService.sendHello()
        }
    });
  }

  private subscribeForAccountNotifications () {
    this.notifService.accountNotificationReceived.subscribe(e => this.onAccountNotification(e));
  }

  private subscribeForServiceNotifications () {
    this.notifService.serviceNotificationReceived.subscribe(e => this.onServiceNotification(e));
  }

  private subscribeForAllNotifications () {
    this.notifService.allNotificationReceived.subscribe(e => this.onAllNotification(e));
  }


  public onAccountNotification(notification: string) {
     this.ngZone.run(() => { 
       this.accountNotifications = notification;  
    });  
  }

  public onServiceNotification(notification: string) {
    this.ngZone.run(() => { 
      this.serviceNotifications = notification;  
   });  
  }

  public onAllNotification(notification: string) {
    this.ngZone.run(() => { 
      this.accountNotifications = notification.split(";")[0];  
      this.serviceNotifications = notification.split(";")[1];  
   });  
  }

   // subscribeForTime() {
  //   this.notifService.timeReceived.subscribe(e => this.onTimeEvent(e));
  // }

  // public onTimeEvent(time: string){
  //   this.ngZone.run(() => { 
  //      this.time = time;  
  //   });  
  // }

  // public onClick() {
  //   if (this.isConnected) {
  //     this.http.click().subscribe(data => console.log(data));
  //   }
  // } 

  // public startTimer() {
  //   this.notifService.StartTimer();
  // }

  // public stopTimer() {
  //   this.notifService.StopTimer();
  //   this.time = "";
  // }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }
  
    return false;
  }

  logged() {
    return localStorage.jwt;
  }

  logout() {
    localStorage.clear();
  }
}
