import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    PostTitle: new FormControl('', Validators.required),
    PostDescription: new FormControl('', Validators.required),
    fielslist: new FormControl('', Validators.required)
  });

  public constructor(private data: DataService) {
    console.log("Constructor Called");
  }

  onFormSubmit() {
    this.data.post("Posts/AddPost", this.loginForm.value).subscribe(data => {
      if (data) {
        console.log(data);
      } else {
        console.log("Not fetched");
      }
    })
  }
  ngOnInit(): void {
    
  }
}
