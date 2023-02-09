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
import { ProfileComponent } from './auths/profile/profile.component';
import { AuthmoduleModule } from './authmodule/authmodule.module';
import { PostsModule } from './posts/posts.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthmoduleRoutingModule,
    PostsRoutingModule,
    AppRoutingModule,
    MaterialModule,
    AuthmoduleModule,
    PostsModule,
    PagesRoutingModule,
    PagesModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
