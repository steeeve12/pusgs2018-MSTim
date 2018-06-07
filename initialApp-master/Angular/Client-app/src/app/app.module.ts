import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

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
}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
