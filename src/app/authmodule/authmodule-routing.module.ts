import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthmainComponent } from './authmain.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../Guards/auth.guard';
const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"Register", component: RegisterComponent},
  {path:"authhome", component: AuthmainComponent},
  {path:"settings", component: SettingsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthmoduleRoutingModule { }
