import { ChangeDetectionStrategy } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Calculator } from './calculator.model';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  monthlyPaymentChanged = new Subject<string>();
  monthlyInterestChanged = new Subject<number>();
  monthlyPrincipleChanged = new Subject<number>();
  hoaChanged = new Subject<number>();
  taxesChanged = new Subject<number>();
  propertyTaxRateChanged = new Subject<number>();
  homeInsuranceChanged = new Subject<number>();
  downPaymentChanged = new Subject<number>();
  downPaymentPercentageChanged = new Subject<number>();
  includeTaxesAndInsuranceChanged = new Subject<boolean>();
  

  public monthlyInterest: number = 833;
  public monthlyPrinciple: number = 240;
  public monthlyPayment: string;
  public hoa: number = -1;
  public taxes: number = 0;
  public propertyTaxRate: number;
  public homeInsurance: number;
  public downPayment: number = 50000;
  public downPaymentPercentage: number;
  public homePrice: number = 0;
  public includeTaxesAndInsurance: boolean = false

  public mortgageInputs: Calculator;

  getMonthlyPayment() {
    return this.monthlyPayment;
  }

  getMonthlyPrinciple() {
    // console.log('MONTHLY PRINCIPLE GETTER: ' + this.monthlyPrinciple);
    return this.monthlyPrinciple;
  }

  getMonthlyInterest() {
    // console.log('MONTHLY INTEREST GETTER: ' + this.monthlyInterest);
    return this.monthlyInterest;
  }

  getTaxesAndInsuranceIsActive() {
    if (this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
      return true;
    }
    return false;
  }

  updateInputs(mortgageInputs: Calculator) {
    this.mortgageInputs = mortgageInputs;
    this.calculateMonthlyPayment();
  }

  calculateMonthlyPayment() {
    console.log(this.mortgageInputs)
    let principle = this.mortgageInputs.homePrice - this.downPayment;

    if (this.homePrice != this.mortgageInputs.homePrice) {
      console.log('in home price if statement')
      if(this.mortgageInputs.homePrice <= 0) {
        return;
      }

      let downPercentage = this.mortgageInputs.downPaymentPercentage / 100;
      this.downPayment = this.mortgageInputs.homePrice * downPercentage;

      this.downPaymentPercentage =
        (this.downPayment / this.mortgageInputs.homePrice) * 100;

      principle = this.mortgageInputs.homePrice - this.downPayment;

      this.downPaymentPercentageChanged.next(this.downPaymentPercentage);
      this.downPaymentChanged.next(this.downPayment);

      this.homePrice = this.mortgageInputs.homePrice;
      
    } else if (this.downPayment != this.mortgageInputs.downPayment ) {
      
      console.log(this.mortgageInputs.downPayment)
      this.downPaymentPercentage =
        (this.mortgageInputs.downPayment / this.mortgageInputs.homePrice) * 100;
      this.downPaymentPercentageChanged.next(
        +this.downPaymentPercentage.toFixed(2)
      );
      principle =
        this.mortgageInputs.homePrice - this.mortgageInputs.downPayment;
        this.downPayment = this.mortgageInputs.downPayment
        
    } else if (
      this.downPaymentPercentage != this.mortgageInputs.downPaymentPercentage
    ) {
 
      let downPercentage = this.mortgageInputs.downPaymentPercentage / 100;
      this.downPayment = this.mortgageInputs.homePrice * downPercentage;

      principle = this.mortgageInputs.homePrice - this.downPayment;

      this.downPaymentChanged.next(this.downPayment);
      this.downPaymentPercentage = this.mortgageInputs.downPaymentPercentage
    }

    let interest = this.mortgageInputs.interestRate / 100 / 12;
    let numberOfPeriods = this.mortgageInputs.loanProgram * 12;
    let updatedInterest = interest + 1;

    let monthlyPayments =
      (principle * Math.pow(updatedInterest, numberOfPeriods) * interest) /
      (Math.pow(updatedInterest, numberOfPeriods) - 1);

    let monthlyInterest = principle * interest;
    let monthlyPrinciple = monthlyPayments - monthlyInterest;


    // if(this.taxes != this.mortgageInputs.propertyTax) {
    //   console.log('this is the if statement for taxes')
    //   this.propertyTaxRate =
    //     (this.mortgageInputs.propertyTax / this.mortgageInputs.homePrice) * 100;
    //     this.propertyTaxRateChanged.next(
    //       +this.propertyTaxRate.toFixed(2)
    //     );
    //     this.taxes = this.mortgageInputs.propertyTax
    //     this.taxesChanged.next(this.taxes);
    //     if(this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
    //       monthlyPayments += this.taxes / 12;
    //     }
        
    // } else if (this.propertyTaxRate != this.mortgageInputs.propertyTaxRate) {
    //   console.log('this is the if statement for the percentage')
    //   let downPercentage = this.mortgageInputs.propertyTaxRate / 100;
    //   this.taxes = this.mortgageInputs.homePrice * downPercentage;
    //   console.log(this.taxes)
      
    //   this.taxesChanged.next(this.taxes);
    //   if(this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
    //     monthlyPayments += this.taxes / 12;
    //   }
    // }
    
    // if(this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
    //   this.homeInsurance = this.mortgageInputs.homeInsurance / 12;
    //   this.homeInsuranceChanged.next(this.homeInsurance);
    //   monthlyPayments += this.homeInsurance;
    //   this.includeTaxesAndInsurance = true;
    //   this.includeTaxesAndInsuranceChanged.next(this.includeTaxesAndInsurance)
    // } 

    if(this.taxes != this.mortgageInputs.propertyTax) {
      this.propertyTaxRate =
        (this.mortgageInputs.propertyTax / this.mortgageInputs.homePrice) * 100;
        this.propertyTaxRateChanged.next(
          +this.propertyTaxRate.toFixed(2)
        );
       

    } else if(this.propertyTaxRate != this.mortgageInputs.propertyTaxRate) {
      let downPercentage = this.mortgageInputs.propertyTaxRate / 100;
      this.taxes = this.mortgageInputs.homePrice * downPercentage;
      
      this.taxesChanged.next(this.taxes);
    }
  
    
    if(this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
      let taxes = this.mortgageInputs.propertyTax / 12
      this.taxes = this.mortgageInputs.propertyTax
      this.taxesChanged.next(this.taxes)
      this.homeInsurance = this.mortgageInputs.homeInsurance / 12;
      this.homeInsuranceChanged.next(this.homeInsurance);
      monthlyPayments += taxes;
      monthlyPayments += this.homeInsurance;
      this.includeTaxesAndInsurance = true;
      this.includeTaxesAndInsuranceChanged.next(this.includeTaxesAndInsurance)
    }
    
    if(this.mortgageInputs.taxesAndInsurance.length === 0) {
      this.includeTaxesAndInsurance = false;
      this.includeTaxesAndInsuranceChanged.next(this.includeTaxesAndInsurance)
    }



    monthlyPayments += this.mortgageInputs.hoaDues;
    this.hoa = this.mortgageInputs.hoaDues;
    this.hoaChanged.next(this.hoa);

    this.monthlyInterest = monthlyInterest;
    this.monthlyInterestChanged.next(this.monthlyInterest);

    this.monthlyPrinciple = monthlyPrinciple;
    this.monthlyPrincipleChanged.next(this.monthlyPrinciple);

    this.monthlyPayment = monthlyPayments.toFixed(2);
    this.monthlyPaymentChanged.next(this.monthlyPayment);
  }
}
