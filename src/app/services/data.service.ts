import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  APIURL = "https://localhost:44379/api/";

  get(urlParam : string) : Observable<any> {
    return this.http.get(this.APIURL.toString() + urlParam, {'headers' : this.headers()});
  }
  post(urlParam : string , data : any) : Observable<any>
  {
    return this.http.post(this.APIURL.toString() + urlParam,data,{'headers' : this.headers()});
  }
  
  public headers() {
    const httpHeaders = new HttpHeaders({
      'Accept':'*/*','apptype': 'Web', 
      'Cache-Control': 'no-cache', 
      'Content-Type': 'multipart/form-data; charset=utf-8'
    });

    return httpHeaders;
  };
}
