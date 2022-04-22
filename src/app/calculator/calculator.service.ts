import { Injectable } from '@angular/core';
import { Calculator } from './calculator.model';

// M = P [ I ( 1 + I )^N ] / [ ( 1 + I )^N – 1 ]
// M = Monthly Payment
// P = Principal Amount(total amount borrow)
// I = Interest rate on the mortgage
// N = Number of periods(monthly mortgage payments)

// Calculations
// Home Price - Down Payment = Loan Amount
// Down Payment / Home Price = Down Payment Percentage * 100
// Down Payment Percentage / Home Price = Down Payment
// Loan Program (years) * 12
// Interest Rate
//
// Property Tax / Home Price = Property Tax Percentage * 100
// Home Price * (Property Tax Percentage / 100) = Property Tax
// Home Insurance added to Total Amount Per Year
// HOA dues * 12 added to Total Amount Per Year

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  public mortgageInputs: Calculator = new Calculator(
    250000,
    50000,
    20,
    30,
    5,
    3990,
    1.33,
    1260,
    200,
    'pim',
    'taxes'
  );

  calculateMonthlyPayment() {
    
    let principle = this.mortgageInputs.homePrice - this.mortgageInputs.downPayment;
    let interest = (this.mortgageInputs.interestRate / 100) / 12
    let numberOfPeriods = this.mortgageInputs.loanProgram * 12;
    let updatedInterest = interest + 1;
    
    let monthlyPayments = (principle * Math.pow(updatedInterest, numberOfPeriods)*interest)/(Math.pow(updatedInterest,numberOfPeriods)-1)

    return monthlyPayments.toFixed(2);
  }
}
