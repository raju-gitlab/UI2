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
    ProfileImagePath : new FormControl(null, Validators.required),
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
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  }

  onFormSubmit() {
    console.log(this.pageform.value);
    this.dataservice.post("page/CreatePage", this.pageform.value).subscribe(data => {
      console.log(data);
      
    })
  }
  ngOnInit(): void { }
}
