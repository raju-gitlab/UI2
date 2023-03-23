import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { DataService } from 'src/app/services/data.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-createpagepost',
  templateUrl: './createpagepost.component.html',
  styleUrls: ['./createpagepost.component.css']
})
export class CreatepagepostComponent {
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
  PostForm = new FormGroup({
    PostTitle: new FormControl('', Validators.required),
    PostDescription: new FormControl('', Validators.required),
    ProfileImagePath: new FormControl(null, Validators.required),
    MediaVisibilityState: new FormControl('', Validators.required),
    PostCategoryName: new FormControl('', Validators.required),
    PostTags: new FormControl('', Validators.required),
    UserUUID: new FormControl(''),
    PageUUID : new FormControl('')
  });

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | any;
  @ViewChild('file', {
    static: true
  }) file: any;
  public constructor(private dataservice: DataService, private http: HttpClient, private formBuilder: FormBuilder) {
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
      this.binarySearch(value);
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
    // this.binarySearch(event.option.viewValue);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  onFormSubmit() {
    this.PostForm.patchValue({ "UserUUID": sessionStorage.getItem("username")?.toString() });
    this.PostForm.patchValue({ "PostTags": this.tagsList });
    this.dataservice.post("Posts/CreatePagePost", this.PostForm.value).subscribe(data => {
      console.log("Success");
    },
      error => {
        console.log("Error");
      });
    console.log(this.PostForm.value);
  }
}
