import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public isVisible = false;

  @ViewChild('f')calculatorForm: NgForm
  homePrice = '300,000'

  constructor() { }

  ngOnInit(): void {
  }

  toggleSection() {
    this.isVisible = !this.isVisible
  }

}
