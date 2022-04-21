import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  public isVisible = false;
  myForm: FormGroup;

  loanPrograms = ['30 Year Fixed', '15 Year Fixed', '5 Year ARM'];

  constructor(private currencyPipe: CurrencyPipe, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      homePrice: ['', Validators.required],
      downPayment: ['', Validators.required],
      downPaymentPercentage: ['', Validators.required],
      loanProgram: ['', Validators.required],
      interestRate: ['', Validators.required],
      pmi: [''],
      taxesAndInsurance: [''],
      propertyTax: [''],
      propertyTaxRate: [''],
      homeInsurance: [''],
      hoaDues: [''],
    });

    //figure out if a switch case is possible here

    this.myForm.valueChanges.subscribe((form) => {
      if (form.homePrice) {
        this.myForm.patchValue(
          {
            homePrice: this.currencyPipe.transform(
              form.homePrice.replace(/\D/g, '').replace(/^0+/, ''),
              'USD',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
      if (form.downPayment) {
        this.myForm.patchValue(
          {
            downPayment: this.currencyPipe.transform(
              form.downPayment.replace(/\D/g, '').replace(/^0+/, ''),
              'USD',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
      if (form.propertyTax) {
        this.myForm.patchValue(
          {
            propertyTax: this.currencyPipe.transform(
              form.propertyTax.replace(/\D/g, '').replace(/^0+/, ''),
              'USD',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
      if (form.homeInsurance) {
        this.myForm.patchValue(
          {
            homeInsurance: this.currencyPipe.transform(
              form.homeInsurance.replace(/\D/g, '').replace(/^0+/, ''),
              'USD',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
      if (form.hoaDues) {
        this.myForm.patchValue(
          {
            hoaDues: this.currencyPipe.transform(
              form.hoaDues.replace(/\D/g, '').replace(/^0+/, ''),
              'USD',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
    });
  }

  toggleSection() {
    this.isVisible = !this.isVisible;
  }
}
