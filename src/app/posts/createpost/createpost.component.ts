import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  modules = {}
  categorylist: any = null;
  isDisplay: string = "none";
  url: any = "assets/nopages.png";
  imagefile: any;
  formdata = new FormData();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  uniquetags : string[] = []; // not implemented in code
  allFruits: string[] = [];


  pageform = new FormGroup({
    PageName: new FormControl('', Validators.required),
    PageDescription: new FormControl('', Validators.required),
    ProfileImagePath: new FormControl(null, Validators.required),
    PrivacyType: new FormControl('', Validators.required),
    CategoryType: new FormControl('', Validators.required)
  });

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | any;
  public constructor(private dataservice: DataService, private http : HttpClient) {
    this.dataservice.get("Misc/ListTags").subscribe(data => {
      this.allFruits = data;
    });
    this.dataservice.get("Misc/ListCategories").subscribe(data => {
      this.categorylist = data;
    });
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
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

  changeWebsite(e: any) {
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
    const value = (event.value || '').trim();
    // console.log(value);
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }
    // Clear the input value
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
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);    
   
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  onFormSubmit() {
    // console.log(this.pageform.value);
    // console.log(this.allFruits);
    //let params = new HttpParams();
    //const lparams = ['item1', 'item2', 'item3', 'item4'];
    //params.append('tags', JSON.stringify(lparams));
    // this.http.get("https://localhost:44379/api/Misc/Addtag", {params}).subscribe(data => {
    //   console.log(data);
    // });
//this.allFruits.push(value)
    console.log(JSON.stringify(this.uniquetags));
  }

  binarySearch(value: string) : Boolean {
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
    return (this.allFruits[middle].toLowerCase() != value.toLowerCase()) ? false : true;
  }
}