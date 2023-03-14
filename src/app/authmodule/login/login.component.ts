import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });

  public constructor(private data: DataService, private router: Router) {
    console.log("Constructor Called");
  }

  onFormSubmit() {
    this.data.get("auth/login?UserName="+ this.loginForm.value.Username +"&Password=" + this.loginForm.value.Password).subscribe((data) => {
      if(data) {
        sessionStorage.setItem("username" ,data.toString());
        this.router.navigateByUrl("");
      }
      else {
        this.router.navigateByUrl("login");
      }
    });
  }
  ngOnInit(): void {
    
  }
}
