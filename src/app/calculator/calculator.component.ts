import { Component, OnDestroy, OnInit } from '@angular/core';
import { Calculator } from './calculator.model';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { Subscription } from 'rxjs';

interface LoanPrograms {
  name: string;
  code: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit, OnDestroy {
  public isVisible = false;
  myForm: FormGroup;
  loanPrograms: LoanPrograms[];
  private downPaymentChangeSub: Subscription;
  private downPaymentPercentageSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private calcService: CalculatorService
  ) {}

  ngOnInit(): void {

    this.downPaymentChangeSub = this.calcService.downPaymentChanged.subscribe((value) => {
      console.log(value)
      this.myForm.patchValue({
        downPayment: value
      }, {emitEvent: false, onlySelf: true})
    })

    this.downPaymentPercentageSub = this.calcService.downPaymentPercentageChanged.subscribe((value) => {
      this.myForm.patchValue({
        downPaymentPercentage: value
      }, {emitEvent: false, onlySelf: true})
    })

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
      propertyTax: [0],
      propertyTaxRate: [0],
      homeInsurance: [0],
      hoaDues: [0],
      pmi: new FormControl('', []),
      taxesAndInsurance: new FormControl('', []),
    });

    this.onUpdateInputs();

    this.myForm.valueChanges.subscribe((form) => {
      if (form) {
        this.onUpdateInputs();
        
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
      value.interestRate,
      value.hoaDues,
      value.propertyTax,
      value.propertyTaxRate,
      value.homeInsurance,
      value.pmi,
      value.taxesAndInsurance
    );
    this.calcService.updateInputs(newCalculator);
  }

  // onCalculate() {
  //   this.onUpdateInputs();
    
  // }

  ngOnDestroy(): void {
    this.downPaymentChangeSub.unsubscribe();
    this.downPaymentPercentageSub.unsubscribe();
  }
}
