import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service.component';
import { MainComponent } from './main/main.component';
import { ClockComponent } from './clock/clock.component';
import { SignalRService } from 'src/app/services/signalR-services';
import { VehicleComponent } from './vehicle/vehicle.component';

import { RatingModule } from "ngx-rating";
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

const Routes = [
{
  path: '',
  redirectTo: "/home",
  pathMatch: 'full'
},  
{
  path: "home",
  component: HomeComponent,
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "service/:Id",
  component: ServiceComponent
},
{
  path: "vehicle/:Id",
  component: VehicleComponent
}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ClockComponent,
    ServiceComponent,
    VehicleComponent,
    FileSelectDirective,
    FileDropDirective 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    Ng2CarouselamosModule
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
