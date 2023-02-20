import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { WriteBlogComponent } from './write-blog/write-blog.component';


@NgModule({
  declarations: [
    WriteBlogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BlogsRoutingModule
  ]
})
export class BlogsModule { }
