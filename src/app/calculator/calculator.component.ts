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

  private mortgageInfoChangeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private calcService: CalculatorService,
  
  ) {}

  ngOnInit(): void {

    this.mortgageInfoChangeSub = this.calcService.mortgageInfoChange.subscribe((value) => {
      this.myForm.patchValue(
        {
          downPayment: value.downPayment,
          downPaymentPercentage: value.downPaymentPercentage,
          propertyTax: value.propertyTax,
          propertyTaxRate: value.propertyTaxRate
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
    this.mortgageInfoChangeSub.unsubscribe();
  }



  homePriceValidator = (control: AbstractControl) => {
 
    if(control.value < 5000) {
      return {invalidPrice: true}
    }
    return null;
  }

}
