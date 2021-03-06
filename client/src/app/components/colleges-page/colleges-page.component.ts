import { Component, OnInit } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-colleges-page',
  templateUrl: 'colleges-page.component.html',
  styleUrls: ['colleges-page.component.css'],
  providers: [Title]
})
export class CollegesPageComponent implements OnInit {

  colleges:College[];
  collegeService: CollegeService;

  constructor(collegeService: CollegeService,  private title: Title) {
    this.collegeService = collegeService;
    this.title.setTitle('Colleges');
    this.colleges = [];
  }

  ngOnInit() {
    this.collegeService.colleges().subscribe(
      data => {
        this.colleges = data;
      });
  }

}
