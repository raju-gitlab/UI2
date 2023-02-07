import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepostComponent } from './createpost/createpost.component';

const routes: Routes = [
  {path: "posts/CreatePost", component: CreatepostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
