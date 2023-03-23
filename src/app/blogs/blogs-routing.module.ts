import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';

const routes: Routes = [
  {path: "blog/blogs", component: BlogsComponent},
  {path: "blog/Createblog", component: WriteBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
