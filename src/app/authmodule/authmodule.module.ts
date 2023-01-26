import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthmoduleRoutingModule } from './authmodule-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RegisterComponent,
    RestPasswordComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthmoduleRoutingModule
  ]
})
export class AuthmoduleModule { }
