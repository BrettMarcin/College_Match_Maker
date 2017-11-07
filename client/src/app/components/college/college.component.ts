import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';

@Component({
  selector: 'app-college',
  templateUrl: 'college.component.html',
  styleUrls: ['college.component.css']
})
export class CollegeComponent implements OnInit {

  theCollegeParam: string;
  theCollege: College = null;
  collegeService: CollegeService;

  constructor(collegeService: CollegeService,private route: ActivatedRoute) {
    this.collegeService = collegeService;
    this.theCollegeParam = route.snapshot.params["theCollege"];
  }

  ngOnInit() {
    this.collegeService.college(this.theCollegeParam).subscribe(
      data => {
        this.theCollege = data;
      });
  }

}
