import { Component, OnInit } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchTerm: string;
  results:College[];
  username = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);

  startAt = new Subject();
  endAt = new Subject();
  currentUser:User;
  signInForm: FormGroup;
  loginError: boolean = false;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private router: Router, fb: FormBuilder,private collegeService :CollegeService, private userService: UserService) {
    this.signInForm = fb.group({
      "username": this.username,
      "password": this.password
    });
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      data => {
        this.currentUser = data;
      }
    );
  }

  changeValue(theCollege:string) {
    this.collegeService.getCertainColleges(theCollege)
      .subscribe(results => {
        this.results = results;
      });
  }

  checkProperty(){
    if(typeof this.currentUser === 'undefined' || this.currentUser === null){
      return true;
    } else {
      return (this.currentUser.userName === 'null')
    }
  }

  logout(){
    this.userService.logout().subscribe(
      data => {
        console.log(data);
        this.currentUser = null;
        window.location.reload();
      }
    );
  }

  loginClick(){
    this.loginError = false;
  }

  login(theUser:User){
    this.userService.loginUser(theUser).subscribe(
      data => {
        console.log(data);
        if(data.status !== 'failure') {
          window.location.reload();
        } else {
          this.loginError = true;
        }
        this.userService.getUser().subscribe(
          data => {
            this.currentUser = data;
          }
        );
      }
    );
  }

}
