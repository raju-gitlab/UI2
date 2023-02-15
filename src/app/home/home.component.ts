import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../authmodule/login/login.component';
import { LogoutComponent } from '../authmodule/logout/logout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
