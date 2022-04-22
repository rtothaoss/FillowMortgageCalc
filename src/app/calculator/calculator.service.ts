import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Calculator } from './calculator.model';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  monthlyPaymentChanged = new Subject<string>();
  public monthlyPayment: string;

  public mortgageInputs: Calculator;

  getMonthlyPayment() {
    return this.monthlyPayment;
  }

  updateInputs(mortgageInputs: Calculator) {
    this.mortgageInputs = mortgageInputs;
    
  }

  calculateMonthlyPayment() {
    let principle =
      this.mortgageInputs.homePrice - this.mortgageInputs.downPayment;
    let interest = this.mortgageInputs.interestRate / 100 / 12;
    let numberOfPeriods = this.mortgageInputs.loanProgram * 12;
    let updatedInterest = interest + 1;

    let monthlyPayments =
      (principle * Math.pow(updatedInterest, numberOfPeriods) * interest) /
      (Math.pow(updatedInterest, numberOfPeriods) - 1);

    this.monthlyPayment = monthlyPayments.toFixed(2);
    this.monthlyPaymentChanged.next(this.monthlyPayment);
  }
}
