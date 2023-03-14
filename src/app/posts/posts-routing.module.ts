import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard';
import { CreatepagepostComponent } from './createpagepost/createpagepost.component';
import { CreatepostComponent } from './createpost/createpost.component';

const routes: Routes = [
  {path: "posts/CreatePost", component: CreatepostComponent, canActivate:[AuthGuard]},
  {path: "posts/CreatePagePost", component: CreatepagepostComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
