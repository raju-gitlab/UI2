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
  }
  
  opensearch() {
    this.dialouge.open(SearchContentComponent);
  }
  ngOnInit(): void {
    this.authlink = "login";
  }
}
