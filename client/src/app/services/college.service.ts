import { Injectable } from '@angular/core';
import { College } from '../models/college.interface'
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CollegeService {

  theColleges:College[];

  constructor(private http:Http ) {}

  sendCollegeInfo(theCollege: College) {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/sendCollegeInfo', theCollege,options)
      .map(response => {
        return response.json();
      });
  }

  colleges(){
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/colleges', options)
      .map(response => {
        return response.json();
      });
  }

  college(theCollege: string){
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/college/' + theCollege, options)
      .map(response => {
        return response.json();
      });
  }

  getCertainColleges(theCollege: string){
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/getCertainColleges?search=' + theCollege, options)
      .map(response => {
        return response.json();
      });
  }

}
