import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchContentComponent } from './search-content/search-content.component';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'API';
  Isloggedin: Boolean = true;
  closeResult = '';
  authlink : string = "null";

  public constructor(private dialouge : MatDialog) { 
    let userName = sessionStorage.getItem("username");
    if(userName) {
      this.Isloggedin = false;
      this.authlink = "logout";
    }
    else {
      this.Isloggedin = true;
      this.authlink = "login";
    }
  }

  opensearch() {
    this.dialouge.open(SearchContentComponent);
  }
  logout() {
    let a = confirm("Are you sure");
    console.log(a);
    sessionStorage.clear();
    this.Isloggedin = true;
    this.authlink = "login";
  }
  ngOnInit(): void { }
}
