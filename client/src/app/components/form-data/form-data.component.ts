import { Component, NgModule, OnInit, AfterViewInit,AfterViewChecked } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';



@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements AfterViewChecked {

  inputBoxes:Map<string, College> = new Map();
  form: FormGroup;
  colleges:College[] = [];
  collegeService: CollegeService;
  size = new FormControl("", Validators.required);
  state = new FormControl("", Validators.required);
  tuition = new FormControl("", Validators.required);
  firstCollege:College;
  secCollege:College;

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  testd=[4000, 5000, 6000,7000,1000];
  testid=['Tom', 'John', 'Bill','jjj', 'Kay'];

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private color: any;

  title = 'Colleges Chart!';
  constructor(fb: FormBuilder, collegeService: CollegeService,) {
    this.collegeService = collegeService;
    this.form = fb.group({
      "size": this.size,
      "state": this.state,
      "tuition": this.tuition,

    });
  }

  ngAfterViewChecked(){
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
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

  private initSvg() {
    this.color = d3Scale.scaleOrdinal()
                        .range(["#98abc5"]);
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
                     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.colleges.map((d) => d.name));
    this.y.domain([0, d3Array.max(this.colleges, (d) => d.tuition)]);
  }

  private drawAxis() {
    this.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y).ticks(10))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");
  }

  private drawBars() {
    this.g.selectAll(".bar")
          .data(this.colleges)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d) => this.x(d.name) )
          .attr("y", (d) => this.y(d.tuition) )
          .attr("width", this.x.bandwidth())
          .attr("height", (d) => this.height - this.y(d.tuition))
          .style("fill", (d: any) => this.color(d.tuition) );
  }
}
