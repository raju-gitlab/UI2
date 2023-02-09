import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePageComponent } from '../create-page/create-page.component';

@Component({
  selector: 'app-my-pages',
  templateUrl: './my-pages.component.html',
  styleUrls: ['./my-pages.component.css']
})
export class MyPagesComponent {
  condition: boolean = true;
  public constructor(private dialouge : MatDialog) { }

  createnewpage() {
    this.dialouge.open(CreatePageComponent);
  }
}
