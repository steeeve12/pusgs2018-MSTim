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
import { AgmCoreModule } from '@agm/core';

import { TruncateModule } from 'ng2-truncate';

import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/interceptor';
import { CanActivateViaAuthGuard } from './guard/auth.guard';

import { VehicleSearchPipe } from './pipes/vehilce-search-pipe';

import { NgxPaginationModule } from 'ngx-pagination';

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
  path: "vehicle/:vehicleId/:serviceId",
  component: VehicleComponent
},
{
  path: "account",
  component: AccountComponent
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
    FileDropDirective,
    AccountComponent,
    VehicleSearchPipe
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
    Ng2CarouselamosModule,
    TruncateModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),
    MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [SignalRService,
    CanActivateViaAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'CanAlwaysActivateGuard',
      useValue: () => {
        return true;
      } 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
