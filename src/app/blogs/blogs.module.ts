import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { WriteBlogComponent } from './write-blog/write-blog.component';
import { BlogsComponent } from './blogs/blogs.component';


@NgModule({
  declarations: [
    WriteBlogComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BlogsRoutingModule
  ]
})
export class BlogsModule { }
