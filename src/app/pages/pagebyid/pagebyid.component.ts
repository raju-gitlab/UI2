import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-pagebyid',
    templateUrl: './pagebyid.component.html',
    styleUrls: ['./pagebyid.component.css']
})
export class PagebyidComponent implements OnInit {
    saveFileForm = new FormGroup({
        RoleName: new FormControl('', Validators.required),
        UserId: new FormControl('', Validators.required)
    });
    TopPosts: any;
    PageDetails: any;
    RolesList: any;
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private dataservice: DataService,) {
        this.dataservice.authenticatedget("Posts/PagePosts?UserId=" + sessionStorage.getItem("username") + "&PageId=" + this.route.snapshot.paramMap.get('PageId')).subscribe(data => {
            this.TopPosts = data;
            console.log(this.TopPosts.PageDetails);
            console.log(this.TopPosts.Posts);
        });
        this.dataservice.authenticatedget("Page/PageById?PageId=" + this.route.snapshot.paramMap.get('PageId')).subscribe(data => {
            this.PageDetails = data;
        });
        this.dataservice.get("Page/GetRolesList").subscribe(data => {
            this.RolesList = data;
        })
    }
    ngOnInit(): void {

    }

    onExpSubmit() {
        this.dataservice.authenticatedget("/").subscribe(data => {

        },
            error => {

            })
    }
}
