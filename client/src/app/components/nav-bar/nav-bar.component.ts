import { Component, OnInit } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchTerm: string;
  results:College[];

  startAt = new Subject();
  endAt = new Subject();

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private collegeService :CollegeService) {

  }

  ngOnInit() {
  }

  changeValue(theCollege:string) {
    this.collegeService.getCertainColleges(theCollege)
      .subscribe(results => {
        this.results = results;
      });
  }

}
