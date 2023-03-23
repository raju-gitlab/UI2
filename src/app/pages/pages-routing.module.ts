import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { MyPagesComponent } from './my-pages/my-pages.component';
import { PagebyidComponent } from './pagebyid/pagebyid.component';

const routes: Routes = [
  {path:"pages/mypages",component:MyPagesComponent},
  {path:"pages/createpage", component:CreatePageComponent},
  {path: "pages/Managepage", component:ManagePageComponent},
  {path: "pages/PageByPageId/:PageId", component:PagebyidComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
