import { Injectable } from '@angular/core';
import { User } from '../models/user.interface'
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  checkUserName(theName: string){
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/sendCollegeInfo', {name: theName},options)
      .map(response => {
        return response.json();
      });
  }

}
