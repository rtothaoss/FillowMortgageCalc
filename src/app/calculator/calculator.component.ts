import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator.model';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CalculatorService } from './calculator.service';

interface LoanPrograms {
  name: string;
  code: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  public isVisible = false;
  myForm: FormGroup;
  loanPrograms: LoanPrograms[];

  constructor(
    private fb: FormBuilder,
    private calcService: CalculatorService
  ) {}

  ngOnInit(): void {
    this.loanPrograms = [
      { name: '30 Year Fixed', code: '30' },
      { name: '15 Year Fixed', code: '15' },
      { name: '5 Year ARM', code: '5' },
    ];

    this.myForm = this.fb.group({
      homePrice: [250000, Validators.required],
      downPayment: [50000, Validators.required],
      downPaymentPercentage: [20, Validators.required],
      loanProgram: [30, Validators.required],
      interestRate: [5, Validators.required],
      propertyTax: [3990],
      propertyTaxRate: [1.33],
      homeInsurance: [1260],
      hoaDues: [200],
      pmi: new FormControl('', []),
      taxesAndInsurance: new FormControl('', []),
    });

    this.onUpdateInputs();

    this.myForm.valueChanges.subscribe((form) => {
      if (form) {
        this.onUpdateInputs();
        this.onCalculate();
      }
    });
  }

  toggleSection() {
    this.isVisible = !this.isVisible;
  }

  onUpdateInputs() {
    const value = this.myForm.value;
    const newCalculator = new Calculator(
      value.homePrice,
      value.downPayment,
      value.downPaymentPercentage,
      value.loanProgram,
      value.interestRate
    );
    this.calcService.updateInputs(newCalculator);
  }

  onCalculate() {
    this.onUpdateInputs();
    
  }
}
