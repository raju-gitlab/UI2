import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './authmodule/login/login.component';
import { LogoutComponent } from './authmodule/logout/logout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'API';
  isvisible = 'hidden';

  public constructor(private popup: MatDialog) { }
  fcuntionTest() {
    this.isvisible = 'visible';
    console.log("Detected");
  }
  fcuntionTest2() {
    this.isvisible = 'hidden'
    console.log("also detected");
  }
  openDialog() {
    this.popup.open(LoginComponent);
  }
  Logout() {
    this.popup.open(LogoutComponent);
  }
}
