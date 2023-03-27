import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
    selector: 'app-pagebyid',
    templateUrl: './pagebyid.component.html',
    styleUrls: ['./pagebyid.component.css']
})
export class PagebyidComponent implements OnInit {
    saveFileForm: any;
    TopPosts : any;
    PageDetails: any;
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private dataservice: DataService,) {
        this.dataservice.authenticatedget("Posts/PagePosts?UserId="+ sessionStorage.getItem("username") + "&PageId=" + this.route.snapshot.paramMap.get('PageId')).subscribe(data => {
            this.TopPosts = data;
            console.log(this.TopPosts.PageDetails);
            console.log(this.TopPosts.Posts);
        });
        this.dataservice.authenticatedget("Pages/PageById?PageId=" + this.route.snapshot.paramMap.get('PageId')).subscribe(data => {
            this.PageDetails = data;
        });
    }
    ngOnInit(): void {
        this.saveFileForm = this.formBuilder.group({
            UserName: ['', [Validators.required]]
        });
    }

    onExpSubmit() {

    }
}
