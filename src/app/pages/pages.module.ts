import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MyPagesComponent } from './my-pages/my-pages.component';
import { AllPagesComponent } from './all-pages/all-pages.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { PagebyidComponent } from './pagebyid/pagebyid.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    MyPagesComponent,
    AllPagesComponent,
    CreatePageComponent,
    ManagePageComponent,
    PagebyidComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [DataService]
})
export class PagesModule { }
