import { Component, OnInit } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';

@Component({
  selector: 'app-colleges-page',
  templateUrl: 'colleges-page.component.html',
  styleUrls: ['colleges-page.component.css']
})
export class CollegesPageComponent implements OnInit {

  colleges:College[];
  collegeService: CollegeService;

  constructor(collegeService: CollegeService) {
    this.collegeService = collegeService;
    this.colleges = [];
  }

  ngOnInit() {
    this.collegeService.colleges().subscribe(
      data => {
        this.colleges = data;
      });
  }

}
