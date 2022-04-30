import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Calculator } from './calculator.model';


import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../shared/common.service';


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
  private propertyTaxChangeSub: Subscription;
  private propertyTaxRateChangeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private calcService: CalculatorService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.downPaymentChangeSub = this.calcService.downPaymentChanged.subscribe(
      (value) => {
        // console.log(value);
        this.myForm.patchValue(
          {
            downPayment: value,
          },
          { emitEvent: false, onlySelf: true }
        );
      }
    );

    this.downPaymentPercentageSub =
      this.calcService.downPaymentPercentageChanged.subscribe((value) => {
        this.myForm.patchValue(
          {
            downPaymentPercentage: value,
          },
          { emitEvent: false, onlySelf: true }
        );
      });

      this.propertyTaxChangeSub = 
      this.calcService.taxesChanged.subscribe((value) => {
        console.log(value)
        this.myForm.patchValue(
          {
            propertyTax: value
          },
          {emitEvent: false, onlySelf: true}
        )
      })

      this.propertyTaxRateChangeSub = 
      this.calcService.propertyTaxRateChanged.subscribe((value) => {
        this.myForm.patchValue(
          {
            propertyTaxRate: value
          },
          {emitEvent: false, onlySelf: true}
        )
      })

    this.loanPrograms = [
      { name: '30 Year Fixed', code: '30' },
      { name: '15 Year Fixed', code: '15' },
      { name: '5 Year ARM', code: '5' },
    ];

    this.myForm = this.fb.group({
      homePrice: [250000, [Validators.required, this.homePriceValidator]],
      downPayment: [50000, Validators.required],
      downPaymentPercentage: [20, Validators.required],
      loanProgram: [30, Validators.required],
      interestRate: [5, Validators.required],
      propertyTax: [0],
      propertyTaxRate: [1.5],
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
    this.propertyTaxChangeSub.unsubscribe();
    this.propertyTaxRateChangeSub.unsubscribe();
  }

  // onClick() {
  //   this.commonService.AClicked('Button clicked!!');
  // }

  homePriceValidator = (control: AbstractControl) => {
 
    if(control.value < 5000) {
      return {invalidPrice: true}
    }
    return null;
  }

}
