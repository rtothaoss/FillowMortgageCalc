import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormArray,
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
      downPayment: [60000, Validators.required],
      downPaymentPercentage: [20, Validators.required],
      loanProgram: ['', Validators.required],
      interestRate: [5, Validators.required],
      propertyTax: [3990],
      propertyTaxRate: [1.33],
      homeInsurance: [1260],
      hoaDues: [200],
      pmi: new FormControl('', []),
      taxesAndInsurance: new FormControl('', []),
    });

    this.myForm.valueChanges.subscribe((form) => {
      console.log(form);
    });

    
  }

  toggleSection() {
    this.isVisible = !this.isVisible;
  }
}
