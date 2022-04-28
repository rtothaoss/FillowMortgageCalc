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
  homeInsuranceChanged = new Subject<number>();
  downPaymentChanged = new Subject<number>();
  downPaymentPercentageChanged = new Subject<number>();

  public monthlyInterest: number = 833;
  public monthlyPrinciple: number = 240;
  public monthlyPayment: string;
  public hoa: number = -1;
  public taxes: number;
  public homeInsurance: number;
  public downPayment: number = 50000;
  public downPaymentPercentage: number;
  public homePrice: number = 0;

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
    let principle = this.mortgageInputs.homePrice - this.downPayment; 



    if(this.downPaymentPercentage != this.mortgageInputs.downPaymentPercentage ) {
      let downPercentage = this.mortgageInputs.downPaymentPercentage / 100;
      this.downPayment = this.mortgageInputs.homePrice * downPercentage;
  
      this.downPaymentPercentage =
        (this.downPayment / this.mortgageInputs.homePrice) * 100;
  
        principle = this.mortgageInputs.homePrice - this.downPayment
  
      this.downPaymentPercentageChanged.next(this.downPaymentPercentage);
      this.downPaymentChanged.next(this.downPayment);
      console.log(this.downPayment)
    }


    if(this.downPayment != this.mortgageInputs.downPayment && this.downPaymentPercentage === this.mortgageInputs.downPaymentPercentage) {
      this.downPaymentPercentage =
      (this.mortgageInputs.downPayment / this.mortgageInputs.homePrice) * 100;
    this.downPaymentPercentageChanged.next(+this.downPaymentPercentage.toFixed(2));
    
      principle = this.mortgageInputs.homePrice - this.mortgageInputs.downPayment
    }


    
    if(this.downPayment === this.mortgageInputs.downPayment){

    let downPercentage = this.mortgageInputs.downPaymentPercentage / 100;
    this.downPayment = this.mortgageInputs.homePrice * downPercentage;

    this.downPaymentPercentage =
      (this.downPayment / this.mortgageInputs.homePrice) * 100;

      principle = this.mortgageInputs.homePrice - this.downPayment

    this.downPaymentPercentageChanged.next(this.downPaymentPercentage);
    this.downPaymentChanged.next(this.downPayment);
    }


 
    let interest = this.mortgageInputs.interestRate / 100 / 12;
    let numberOfPeriods = this.mortgageInputs.loanProgram * 12;
    let updatedInterest = interest + 1;

    let monthlyPayments =
      (principle * Math.pow(updatedInterest, numberOfPeriods) * interest) /
      (Math.pow(updatedInterest, numberOfPeriods) - 1);

    let monthlyInterest = principle * interest;
    let monthlyPrinciple = monthlyPayments - monthlyInterest;

    if (this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
      this.taxes = this.mortgageInputs.propertyTax / 12;
      this.homeInsurance = this.mortgageInputs.homeInsurance / 12;
      monthlyPayments += this.taxes;
      monthlyPayments += this.homeInsurance;
      this.taxesChanged.next(this.taxes);
      this.homeInsuranceChanged.next(this.homeInsurance);
    }

    if (this.mortgageInputs.taxesAndInsurance.length == 0) {
      this.taxes = 0;
      this.homeInsurance = 0;
      this.taxesChanged.next(this.taxes);
      this.homeInsuranceChanged.next(this.homeInsurance);
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
