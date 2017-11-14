import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  l:string = '{';
  r:string = '}';
  home:string = 'https://college-match-maker.herokuapp.com/ [GET]';
  college_post:string = 'https://college-match-maker.herokuapp.com/college [POST]';
  colleges_get_page:string = 'https://college-match-maker.herokuapp.com/colleges [GET]';
  colleges_get:string = 'https://college-match-maker.herokuapp.com/getColleges [GET]';
  college_get:string = 'https://college-match-maker.herokuapp.com/college/{theCollege} [GET]';
  college_delete:string = 'https://college-match-maker.herokuapp.com/college/{theCollege} [DELETE]';


  constructor(private title: Title) {
    this.title.setTitle('API');
  }

  ngOnInit() {
  }

}
