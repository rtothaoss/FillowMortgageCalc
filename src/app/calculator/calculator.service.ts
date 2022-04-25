import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Calculator } from './calculator.model';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  monthlyPaymentChanged = new Subject<string>();
  monthlyInterestChanged = new Subject<number>();
  monthlyPrincipleChanged = new Subject<number>();
  public monthlyInterest: number = 833;
  public monthlyPrinciple: number = 240;
  public monthlyPayment: string;

  public mortgageInputs: Calculator;

  getMonthlyPayment() {
    return this.monthlyPayment;
  }
  
  getMonthlyPrinciple() {
    console.log('monthly princ')
    return this.monthlyPrinciple;
  }

  getMonthlyInterest() {
    console.log('monthly interest')
    return this.monthlyInterest;
  }

  updateInputs(mortgageInputs: Calculator) {
    this.mortgageInputs = mortgageInputs;
    this.calculateMonthlyPayment()
  }

  calculateMonthlyPayment() {
    console.log(this.mortgageInputs.loanProgram)
    let principle =
      this.mortgageInputs.homePrice - this.mortgageInputs.downPayment;
    let interest = (this.mortgageInputs.interestRate / 100) / 12;
    let numberOfPeriods = this.mortgageInputs.loanProgram * 12;
    let updatedInterest = interest + 1;

    let monthlyPayments =
      (principle * Math.pow(updatedInterest, numberOfPeriods) * interest) /
      (Math.pow(updatedInterest, numberOfPeriods) - 1);

      let monthlyInterest = principle * interest
      let monthlyPrinciple = monthlyPayments - monthlyInterest

      

    this.monthlyPayment = monthlyPayments.toFixed(2);
    this.monthlyPaymentChanged.next(this.monthlyPayment);

    this.monthlyInterest = monthlyInterest;
    this.monthlyInterestChanged.next(this.monthlyInterest);

    this.monthlyPrinciple = monthlyPrinciple;
    this.monthlyPrincipleChanged.next(this.monthlyPrinciple);
  }
}
