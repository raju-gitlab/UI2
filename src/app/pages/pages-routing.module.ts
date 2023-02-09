import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { MyPagesComponent } from './my-pages/my-pages.component';

const routes: Routes = [
  {path:"pages/mypages",component:MyPagesComponent},
  {path:"pages/createpage", component:CreatePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
