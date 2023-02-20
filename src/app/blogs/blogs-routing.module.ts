import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteBlogComponent } from './write-blog/write-blog.component';

const routes: Routes = [
  {path: "blog", component: WriteBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
