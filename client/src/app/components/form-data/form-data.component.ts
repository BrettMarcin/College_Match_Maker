import { Component, OnInit } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css'],
  providers: [Title]
})
export class FormDataComponent implements OnInit {

  inputBoxes:Map<string, College> = new Map();
  form: FormGroup;
  colleges:College[] = [];
  collegeService: CollegeService;
  size = new FormControl("", Validators.required);
  state = new FormControl("", Validators.required);
  tuition = new FormControl("", Validators.required);
  firstCollege:College;
  secCollege:College;

  constructor(fb: FormBuilder, collegeService: CollegeService, private title: Title) {
    this.collegeService = collegeService;
    this.title.setTitle('Home');
    this.form = fb.group({
      "size": this.size,
      "state": this.state,
      "tuition": this.tuition
    });
  }

  ngOnInit() {
  }

  checkSize() : boolean {
    return this.inputBoxes.size === 2;
  }

  checkbox(theCollege:College){
    if (this.inputBoxes.has(theCollege.name)){
      this.inputBoxes.delete(theCollege.name);
    } else if(this.inputBoxes.size < 2) {
      this.inputBoxes.set(theCollege.name, theCollege);
    }
    if (this.inputBoxes.size === 2){
      var collegeArray = Array.from(this.inputBoxes);
      this.firstCollege = collegeArray[0][1];
      this.secCollege = collegeArray[1][1];
    }
  }

  shouldDisable(theCollege:College) : boolean {
    if (this.inputBoxes.size === 2){
      if(this.inputBoxes.has(theCollege.name)){
        return false;
      } else {
        return true;
      }
    }
  }

  onSubmit(theCollege: College) {
    this.inputBoxes.clear();
    this.firstCollege = null;
    this.secCollege = null;
    this.collegeService.sendCollegeInfo(theCollege).subscribe(
      data => {
        this.colleges = data;
      }
    );
  }

}
