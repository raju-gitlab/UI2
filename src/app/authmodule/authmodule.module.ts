import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthmoduleRoutingModule } from './authmodule-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { MaterialModule } from '../material/material.module';
import { DataService } from '../services/data.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { AuthmainComponent } from './authmain.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    RegisterComponent,
    RestPasswordComponent,
    LoginComponent,
    LogoutComponent,
    AuthmainComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthmoduleRoutingModule,
    MaterialModule
  ],
  providers: [DataService]
})
export class AuthmoduleModule { }
