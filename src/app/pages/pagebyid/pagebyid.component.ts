import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Component,OnInit,ViewChild} from '@angular/core';  

// import {  
//   FileService  
// } from '../Service/file.service';  
import {  
  Validators,  
  FormBuilder  
} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-pagebyid',
  templateUrl: './pagebyid.component.html',
  styleUrls: ['./pagebyid.component.css']
})
export class PagebyidComponent implements OnInit{
@ViewChild('logoInput', {  
    static: true  
}) logoInput : any;  
selectedFile: any = File;  
imageUrl: string | undefined;  
fileToUpload: any = File;  
saveFileForm: any;  
lstFileDetails: any;  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dataservice : DataService) {}
  ngOnInit(): void {  
    this.saveFileForm = this.formBuilder.group({  
        UserName: ['', [Validators.required]]  
    });
}
    onSelectFile(event: any) {
        let file:FileList =  event.target.files; 
        this.fileToUpload = file.item(0);
        var reader = new FileReader();  
        reader.onload = (event: any) => {  
            this.imageUrl = event.target.result;  
        }  
        reader.readAsDataURL(this.fileToUpload);

        console.log(this.logoInput.nativeElement.files[0]);
    }  

    onExpSubmit() {
        let headers = new HttpHeaders();  
        headers.append('Content-Type', 'application/json');  
        const httpOptions = {  
            headers: headers  
        };  
        if (this.saveFileForm.invalid) {  
            return;  
        }  
        let url = 'https://localhost:44379';
        let formData = new FormData();  
        formData.append('ImageUpload', this.logoInput.nativeElement.files[0]);
        formData.append('UserName', this.saveFileForm.value.UserName);
        return this.http.post(url + '/api/Posts/UploadFile', formData, httpOptions).subscribe(data => {

        });
    } 
}
