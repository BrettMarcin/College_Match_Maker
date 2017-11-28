import { Component, NgModule, OnInit, AfterViewInit,AfterViewChecked } from '@angular/core';
import { College } from '../../models/college.interface';
import { CollegeService } from '../../services/college.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';


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
  private margin = {top: 20, right: 20, bottom: 60, left: 70};

  log = 'bar';
  log2 = 'tuition';

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private color: any;
  private line: d3Shape.Line<[number, number]>;
  title = 'Colleges Chart!';
  constructor(fb: FormBuilder, collegeService: CollegeService,) {
    this.width = 1200 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.collegeService = collegeService;
    this.form = fb.group({
      "size": this.size,
      "state": this.state,
      "tuition": this.tuition,

    });
  }

  ngAfterViewChecked(){
    d3.selectAll("svg > *").remove();
    if(this.log == 'bar' && this.log2 == 'tuition'){
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
    }
    else if(this.log == 'line' && this.log2 == 'tuition'){
      this.initSvg2();
      this.initAxis2();
      this.drawAxis2();
      this.drawLine();
    }
    else if(this.log == 'bar' && this.log2 == 'students'){
      this.initSvg();
      this.initAxis_s();
      this.drawAxis_s();
      this.drawBars_s();
    }
    else if(this.log == 'line' && this.log2 == 'students'){
      this.initSvg2();
      this.initAxis2_s();
      this.drawAxis2_s();
      this.drawLine_s();
    }
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
  private initAxis_s() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.colleges.map((d) => d.name));
    this.y.domain([0, d3Array.max(this.colleges, (d) => d.students)]);
  }
  private drawAxis() {
    this.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.g.append("text")
          .attr("class", "x-label")
          .attr("x", this.width+20)
          .attr("y", this.height-10)
          .style("text-anchor", "end")
          .text("School");
    this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y).ticks(10))
    this.g.append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Tuition");
  }
  private drawAxis_s() {
    this.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.g.append("text")
          .attr("class", "x-label")
          .attr("x", this.width+20)
          .attr("y", this.height-10)
          .style("text-anchor", "end")
          .text("School");
    this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y).ticks(10))
    this.g.append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Students");
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

  private drawBars_s() {
    this.g.selectAll(".bar")
          .data(this.colleges)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d) => this.x(d.name) )
          .attr("y", (d) => this.y(d.students) )
          .attr("width", this.x.bandwidth())
          .attr("height", (d) => this.height - this.y(d.students))
          .style("fill", (d: any) => this.color(d.students) );
  }

  private initSvg2() {
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis2() {
          this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(1.0);
          this.y = d3Scale.scaleLinear().range([this.height, 0]);
          this.x.domain(this.colleges.map((d) => d.name));
          this.y.domain([0, d3Array.max(this.colleges, (d) => d.tuition)]);
  }
  private initAxis2_s() {
          this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(1.0);
          this.y = d3Scale.scaleLinear().range([this.height, 0]);
          this.x.domain(this.colleges.map((d) => d.name));
          this.y.domain([0, d3Array.max(this.colleges, (d) => d.students)]);
  }

  private drawAxis2() {

    this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.svg.append("text")
          .attr("class", "x-label")
          .attr("x", this.width+20)
          .attr("y", this.height-10)
          .style("text-anchor", "end")
          .text("School");
    this.svg.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y))
    this.svg.append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Tuition");

  }
  private drawAxis2_s() {
    this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.svg.append("text")
          .attr("class", "x-label")
          .attr("x", this.width+20)
          .attr("y", this.height-10)
          .style("text-anchor", "end")
          .text("School");
    this.svg.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y))
    this.svg.append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Students");
  }

  private drawLine() {
     this.line = d3Shape.line()
                        .x( (d) => this.x(d.name) )
                        .y( (d) => this.y(d.tuition) );

    this.svg.append("path")
            .datum(this.colleges)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", this.line);
  }
  private drawLine_s() {
     this.line = d3Shape.line()
                        .x( (d) => this.x(d.name) )
                        .y( (d) => this.y(d.students) );

    this.svg.append("path")
            .datum(this.colleges)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", this.line);
  }
  logRadio(element: HTMLInputElement): void {
    this.log = `${element.value}`;
  }
  logRadio2(element: HTMLInputElement): void {
    this.log2 = `${element.value}`;
  }
}
