import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { C } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  categorylist: any = null;
  privacylist: any = null;
  isDisplay: string = "none";
  url: any = "assets/nopages.png";
  imagefile: any;
  formdata = new FormData();
  file: any;

  pageform = new FormGroup({
    PageName: new FormControl('', Validators.required),
    PageDescription: new FormControl('', Validators.required),
    ProfileImagePath: new FormControl(null, Validators.required),
    PrivacyType: new FormControl('', Validators.required),
    CategoryType: new FormControl('', Validators.required)
  });

  uploadImageform = new FormGroup({
    ImagePath : new FormControl(''),
    PageGuid : new FormControl('')
  });

  public constructor(private dataservice: DataService, private router: Router, private fireStorage: AngularFireStorage, private toaster : MatSnackBar) {
    if (!sessionStorage.getItem("username")?.toString()) {
      this.router.navigateByUrl("login");
    }
    this.dataservice.get("Misc/ListCategories").subscribe(data => {
      this.categorylist = data;
    });
    this.dataservice.get("Misc/ListPrivacies").subscribe(data => {
      this.privacylist = data;
    });
  }

  changeWebsite(e: any) {
    if (e.target.value == "59baac6b-9eb3-11ed-b56f-8c1645e01566") {
      this.isDisplay = "block";
    }
    else {
      this.isDisplay = "none";
    }
  }

  async selectFile(event: any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  async onFormSubmit() {
    console.log(this.pageform.value);
    this.dataservice.authenticatedpost("page/CreatePage", this.pageform.value).subscribe(async data => {
      if(this.file) {
        const path = `uploads1/${this.file.name}`;
        const uploadTask = await this.fireStorage.upload(path, this.file);
        const url = await uploadTask.ref.getDownloadURL();
        if(url.length > 0 || url != null || url != undefined) {
          this.uploadImageform.patchValue({ImagePath : url.toString(), PageGuid : data.toString()});
          console.log(this.uploadImageform.value);
          this.dataservice.put("page/UploadLogo", this.uploadImageform.value).subscribe(data => {
            if(data.toString().toLowerCase() == "Success".toString().toLowerCase()) {
              this.toaster.open("Posted", "close", {
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
              this.router.navigateByUrl("pages/mypages")
            }
            else {
              this.toaster.open("Try again", "close", {
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            }
          },
          (error) => {
            this.toaster.open("Try again", "close", {
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          })
        }
      }
    });
  }
  ngOnInit(): void { }
}