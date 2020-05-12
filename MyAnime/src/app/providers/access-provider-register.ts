import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()

export class accessProvider {
  server: string = "http://www.webservices-app.net/";

  constructor(public http: HttpClient) {}

  postData(body, file){
    let header= new HttpHeaders({
      'content-type':'application/json; charset=UTF-8'
    });
    let options = {
      headers: header
    }

    return this.http.post(this.server + file, JSON.stringify(body), options)
    .timeout(59000)
    .map(res => res);
  }
}
