import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { CreatePageComponent } from '../create-page/create-page.component';

@Component({
  selector: 'app-my-pages',
  templateUrl: './my-pages.component.html',
  styleUrls: ['./my-pages.component.css']
})
export class MyPagesComponent implements OnInit{
  MyPages : any = [];
  condition: boolean = true;
  public constructor(private dialouge : MatDialog, private dataservice : DataService) {
    this.dataservice.authenticatedget("Page/PagesById").subscribe(data => {
      this.MyPages = data;
      console.log(this.MyPages);
      
    })
   }

  createnewpage() {
    this.dialouge.open(CreatePageComponent);
  }

  ngOnInit(): void {
      
  }
}
