import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { DataService } from 'src/app/services/data.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createpagepost',
  templateUrl: './createpagepost.component.html',
  styleUrls: ['./createpagepost.component.css']
})
export class CreatepagepostComponent implements OnInit {
  modules = {};
  Pagelists : any;
  PrivacyLists : any;
  categorylist: any = null;
  isDisplay: string = "none";
  url: any = "assets/nopages.png";
  imagefile: any;
  formdata = new FormData();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  uniquetags: string[] = []; // not implemented in code
  allFruits: string[] = [];
  tagsList: string = "";
  PostForm : any;
  fileToUpload: any = File;

  @ViewChild('logoInput', {
    static: true
  }) logoInput: any;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | any;
  @ViewChild('file', {
    static: true
  }) file: any;
  public constructor(private dataservice: DataService, private http: HttpClient, private formBuilder: FormBuilder, private _snackBar : MatSnackBar) {
    this.dataservice.get("Misc/ListTags").subscribe(data => {
      this.allFruits = data;
      
    });
    this.dataservice.get("Misc/ListCategories").subscribe(data => {
      this.categorylist = data;
    });
    this.dataservice.authenticatedget("Page/PagesById").subscribe(data => {
      this.Pagelists = data;
      console.log(this.Pagelists);
      
    });
    this.dataservice.authenticatedget("Misc/ListPrivacies").subscribe(data => {
      this.PrivacyLists = data;
      console.log(this.PrivacyLists);
      
    });
    this.modules = {
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ]
    };
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );

    this.allFruits.sort();
  }
  binarySearch(value: string): void {
    var startIndex = 0,
      stopIndex = this.allFruits.length - 1,
      middle = Math.floor((stopIndex + startIndex) / 2);
    while (this.allFruits[middle].toLowerCase() != value.toLowerCase() && startIndex < stopIndex) {
      if (value.toLowerCase() < this.allFruits[middle].toLowerCase()) {
        stopIndex = middle - 1;
      } else if (value.toLowerCase() > this.allFruits[middle].toLowerCase()) {
        startIndex = middle + 1;
      }
      middle = Math.floor((stopIndex + startIndex) / 2);
    }
    (this.allFruits[middle].toLowerCase() != value.toLowerCase()) ? this.uniquetags.push(value) : console.log("unique");
    ;
  }
  changeWebsite(e: any) {
    if (e.target.value == "59baac6b-9eb3-11ed-b56f-8c1645e01566") {
      this.isDisplay = "block";
    }
    else {
      this.isDisplay = "none";
    }
  }

  selectFile(event: any) {
    debugger;
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }


  blured = false
  focused = false

  created(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  add(event: MatChipInputEvent): void {
    this.tagsList = "," + this.tagsList + event.value;
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }

    const result = this.allFruits.findIndex(item => event.value.toLowerCase() === item.toLowerCase());
    const tresult = this.uniquetags.findIndex(item => event.value.toLowerCase() === item.toLowerCase());
    if ((Number(result) == -1) && (Number(tresult) == -1)) {
      this.uniquetags.push(event.value);
    }

    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.tagsList.concat("," + event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    const result = this.allFruits.findIndex(item => event.option.viewValue.toLowerCase() === item.toLowerCase());
    const tresult = this.uniquetags.findIndex(item => event.option.viewValue.toLowerCase() === item.toLowerCase());
    if ((Number(result) == -1) && (Number(tresult) == -1)) {
      this.uniquetags.push(event.option.viewValue);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  onFormSubmit() {
    let url = 'https://localhost:44379/';
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };
    let uId: any = sessionStorage.getItem("username")?.toString();
    let formData = new FormData();
    formData.append('UploadFile', this.logoInput.nativeElement.files[0]);
    formData.append('PostTitle', this.PostForm.value.PostTitle);
    formData.append('PostDescription', this.PostForm.value.PostDescription);
    formData.append('MediaVisibilityState', this.PostForm.value.MediaVisibilityState);
    formData.append('PostCategoryName', this.PostForm.value.PostCategoryName);
    formData.append('UniqueTags', this.uniquetags.toLocaleString());
    formData.append('AllTags', this.fruits.toLocaleString());
    formData.append('UserUUID', uId);
    formData.append('PageUUID', this.PostForm.value.PageUUID);
    console.log(formData);
    this.http.post(url + 'api/Posts/CreatePagePost', formData, httpOptions).subscribe(data => {
      if(data != null) {
        this._snackBar.open('Posted', 'dismiss', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1* 1000,
          panelClass: ['warning']
        });
      }
      else {
        this._snackBar.open('Error', 'dismiss', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1* 1000,
          panelClass: ['warning']
        });
      }
    });
    
  }
  onSelectFile(event: any) {
    let file: FileList = event.target.files;
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.logoInput.nativeElement.files[0]);
  }    
  ngOnInit(): void {
      this.PostForm = this.formBuilder.group ({
        PostTitle: new FormControl('', Validators.required),
        PostDescription: new FormControl('', Validators.required),
        ProfileImagePath: new FormControl(null, Validators.required),
        MediaVisibilityState: new FormControl('', Validators.required),
        PostCategoryName: new FormControl('', Validators.required),
        PostTags: new FormControl('', Validators.required),
        UserUUID: new FormControl(''),
        PageUUID : new FormControl('')
      });
  }                                                                                                                                                                   
}
