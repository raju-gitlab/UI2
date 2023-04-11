import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    FirstName : new FormControl('', Validators.required),
    LastName : new FormControl('', Validators.required),
    Email : new FormControl('', Validators.required),
    Password : new FormControl('', Validators.required),
    ContactNumber : new FormControl(''),

  });

  constructor(private dataservice : DataService) {}
  onExpSubmit() {
    this.dataservice.post("Auth/Register", this.registerForm.value).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
    console.log(this.registerForm.value);
  }
}
