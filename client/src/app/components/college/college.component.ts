import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { CollegeForm } from '../../models/collegeForm.interface'
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-college',
  templateUrl: 'college.component.html',
  styleUrls: ['college.component.css']
})
export class CollegeComponent implements OnInit {

  theCollegeParam: string;
  theCollege: College = null;
  collegeForm:CollegeForm;
  collegeService: CollegeService;
  currentUser: User;
  theUsername: string;
  questionForm: FormGroup;
  theQuestions: CollegeForm[];
  
  question = new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,collegeService: CollegeService,private route: ActivatedRoute,  private title: Title) {
    this.collegeService = collegeService;
    this.theCollegeParam = route.snapshot.params["theCollege"];
    this.questionForm = fb.group({
      "question": this.question
    });
  }

  ngOnInit() {

    this.userService.getUser().subscribe(
      data => {
        if (!(typeof data.user === 'undefined')){
          this.currentUser = data.user;
          this.theUsername = data.user.userName;
        }
      });

    this.collegeService.college(this.theCollegeParam).subscribe(
      data => {
        this.theCollege = data;
        this.title.setTitle( this.theCollege.name);
      });

    this.collegeService.getForms(this.theCollegeParam).subscribe(
      data => {
        this.theQuestions = data;
      });
  }


  onSubmit(theQuestion){
    this.collegeForm = {title: theQuestion.question, college: this.theCollege.name, owner: this.theUsername};
    this.collegeService.sendForm(this.collegeForm).subscribe(
      data => {
        window.location.reload();
      });
  }

  checkProperty(){
    if(typeof this.currentUser === 'undefined' || this.currentUser === null){
      return true;
    } else {
      return (this.currentUser.userName === 'null')
    }
  }

  removeForm(i){
    this.collegeService.removeForm(this.theQuestions[i].title, this.theCollege.name).subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/college/' + this.theCollege.name]);
        window.location.reload();
      });
  }

  revealComments(i){

  }

}
