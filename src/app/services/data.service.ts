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
  authenticatedget(urlParam : string) : Observable<any> {
    return this.http.get(this.APIURL.toString() + urlParam, {'headers' : this.TokenHeaders()});
  }
  post(urlParam : string , data : any)
  {
    return this.http.post(this.APIURL.toString() + urlParam,data,{'headers' : this.headers()});
  }
  authenticatedpost(urlParam : string , data : any)
  {
    return this.http.post(this.APIURL.toString() + urlParam,data,{'headers' : this.TokenHeaders()});
  }
  
  public headers() {
    const httpHeaders = new HttpHeaders({
      'Accept':'*/*','apptype': 'Web', 
      'Cache-Control': 'no-cache', 
      'Content-Type': 'multipart/form-data; charset=utf-8'
    });

    return httpHeaders;
  };

  public TokenHeaders() {
    let userid = (sessionStorage.getItem("username")?.toString() != null) ? sessionStorage.getItem("username")?.toString() : "no user";
    const httpHeaders = new HttpHeaders({
      'Accept':'*/*','apptype': 'Web', 
      'Cache-Control': 'no-cache', 
      'Content-Type': 'multipart/form-data; charset=utf-8',
      'UserId' : (userid?.toString() != null) ? userid : "noname"
    });
    return httpHeaders;
  };
}
