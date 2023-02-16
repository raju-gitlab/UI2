import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  categorylist : any= null;
  privacylist : any= null;
  isDisplay : string = "none";
  url: any = "assets/nopages.png";
  imagefile : any;
  formdata = new FormData();
    
  pageform = new FormGroup({
    PageName: new FormControl('', Validators.required),
    PageDescription: new FormControl('', Validators.required),
    ProfileImagePath : new FormControl(File, Validators.required),
    PrivacyType : new FormControl('',Validators.required),
    CategoryType : new FormControl('', Validators.required)
  });
  
  public constructor(private dataservice : DataService) {
    this.dataservice.get("Misc/ListCategories").subscribe(data => {
      this.categorylist = data;
    });
    this.dataservice.get("Misc/ListPrivacies").subscribe(data => {
      this.privacylist = data;
    });
  }

  changeWebsite(e : any) {
    if (e.target.value == "59baac6b-9eb3-11ed-b56f-8c1645e01566") {
      this.isDisplay = "block";
    }
    else {
      this.isDisplay = "none";
    }
  }

  selectFile(event: any) {
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    this.formdata.append("files", file);
    this.pageform.patchValue({"ProfileImagePath": file});
  }

  onFormSubmit() {
    this.formdata.append("PageName", "MyPage");    
    this.dataservice.post("Page/CreatePage", this.formdata).subscribe(data => {

      console.log(data);
    })
  		console.log(this.pageform.value);
  }
  ngOnInit(): void { }
}
