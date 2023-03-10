import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';
import { AuthmoduleRoutingModule } from './authmodule/authmodule-routing.module';
import { PostsRoutingModule } from './posts/posts-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthmoduleModule } from './authmodule/authmodule.module';
import { PostsModule } from './posts/posts.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';
import { SearchContentComponent } from './search-content/search-content.component';
import { BlogsModule } from './blogs/blogs.module';
import { BlogsRoutingModule } from './blogs/blogs-routing.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchContentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    AuthmoduleRoutingModule,
    PostsRoutingModule,
    AppRoutingModule,
    MaterialModule,
    AuthmoduleModule,
    PostsModule,
    PagesRoutingModule,
    PagesModule,
    BlogsModule,
    BlogsRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
