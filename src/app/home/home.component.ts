import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../authmodule/login/login.component';
import { LogoutComponent } from '../authmodule/logout/logout.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isvisible = 'hidden';
  title:String = "";
  AllPosts : any;

  public constructor(private popup: MatDialog, private dataservide : DataService) { 
    this.dataservide.get("Posts/ListPosts").subscribe(data => {
      this.AllPosts = data;
    },
    error => {
      console.log(error);
    });
  }


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

  ngOnInit(): void {
      
  }
  
}
