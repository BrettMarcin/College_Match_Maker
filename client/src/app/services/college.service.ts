import { Injectable } from '@angular/core';
import { College } from '../models/college.interface'
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CollegeService {

  theColleges:College[];


  constructor(private http:Http ) { }

  sendCollegeInfo(theCollege: College) {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/sendCollegeInfo', theCollege,options)
      .map(response => {
        return response.json();
      });
  }

}
