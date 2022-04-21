import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  public isVisible = false;
  calculatorForm: FormGroup;
  loanPrograms = ['30 Year Fixed', '15 Year Fixed', '5 Year ARM']

  constructor() {}

  ngOnInit(): void {
    this.calculatorForm = new FormGroup({
      homePrice: new FormControl('300,000',[Validators.required]),
      downPayment: new FormControl('60,000', [Validators.required]),
      downPaymentPercentage: new FormControl('30', [Validators.required]),
      loanProgram: new FormControl('30 Year Fixed', [Validators.required]),
      interestRate: new FormControl('5.075', [Validators.required]),
      pmi: new FormControl(false),
      taxesAndInsurance: new FormControl(false),
      propertyTax: new FormControl('3,990'),
      propertyTaxRate: new FormControl('1.33'),
      homeInsurance: new FormControl('1,260'),
      hoaDues: new FormControl('0'),
    });

    this.calculatorForm.statusChanges.subscribe((value) => {     
      console.log(this.calculatorForm.value.homePrice);
    });
  }

  toggleSection() {
    this.isVisible = !this.isVisible;
  }

  //Create Pipe that adds commas to thousands 
  //let num2 = num.replace(/\d(?=(?:\d{3})+$)/g, '$&,');

  
}
