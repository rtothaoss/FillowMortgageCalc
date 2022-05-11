import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Calculator } from './calculator.model';

type mortgageInput = {
  homePrice: number;
  downPayment: number;
  downPaymentPercentage: number;
  loanProgram: number;
  interestRate: number;
  hoaDues: number;
  propertyTax: number;
  propertyTaxRate: number;
  homeInsurance: number;
  pmi: string;
  taxesAndInsurance: string;
  monthlyInterest: number;
  monthlyPrinciple: number;
  monthlyPayment: string;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {

  includeTaxesAndInsuranceChange = new Subject<boolean>();

  mortgageInfoChange = new Subject<mortgageInput>()
  
  mortgageInfo: mortgageInput = {
    homePrice: 0,
    downPayment: 50000,
    downPaymentPercentage: 0,
    loanProgram: 0,
    interestRate: 0,
    hoaDues: -1,
    propertyTax: 0,
    propertyTaxRate: 0,
    homeInsurance: 0,
    pmi: '',
    taxesAndInsurance: '',
    monthlyInterest: 833,
    monthlyPrinciple: 240,
    monthlyPayment: ''
  }


  public includeTaxesAndInsurance: boolean = false

  public mortgageInputs: Calculator;

  getMonthlyPayment() {
    return this.mortgageInfo.monthlyPayment;
  }

  getMonthlyPrinciple() {
   
    return this.mortgageInfo.monthlyPrinciple;
  }

  getMonthlyInterest() {
   
    return this.mortgageInfo.monthlyInterest;
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
    let principle = this.mortgageInputs.homePrice - this.mortgageInfo.downPayment;

    if (this.mortgageInfo.homePrice != this.mortgageInputs.homePrice) {
      if(this.mortgageInputs.homePrice <= 0) {
        return;
      }

      let downPercentage = this.mortgageInputs.downPaymentPercentage / 100;
      this.mortgageInfo.downPayment = this.mortgageInputs.homePrice * downPercentage;

      this.mortgageInfo.downPaymentPercentage =
        (this.mortgageInfo.downPayment / this.mortgageInputs.homePrice) * 100;

      principle = this.mortgageInputs.homePrice - this.mortgageInfo.downPayment;

    


      this.mortgageInfo.homePrice = this.mortgageInputs.homePrice;


      
    } else if (this.mortgageInfo.downPayment != this.mortgageInputs.downPayment ) {
      
      this.mortgageInfo.downPaymentPercentage =
        (this.mortgageInputs.downPayment / this.mortgageInputs.homePrice) * 100;
      principle =
        this.mortgageInputs.homePrice - this.mortgageInputs.downPayment;
        this.mortgageInfo.downPayment = this.mortgageInputs.downPayment
        
    } else if (
      this.mortgageInfo.downPaymentPercentage != this.mortgageInputs.downPaymentPercentage
    ) {
 
      let downPercentage = this.mortgageInputs.downPaymentPercentage / 100;
      this.mortgageInfo.downPayment = this.mortgageInputs.homePrice * downPercentage;

      principle = this.mortgageInputs.homePrice - this.mortgageInfo.downPayment;

      this.mortgageInfo.downPaymentPercentage = this.mortgageInputs.downPaymentPercentage
    }

    let interest = this.mortgageInputs.interestRate / 100 / 12;
    let numberOfPeriods = this.mortgageInputs.loanProgram * 12;
    let updatedInterest = interest + 1;

    let monthlyPayments =
      (principle * Math.pow(updatedInterest, numberOfPeriods) * interest) /
      (Math.pow(updatedInterest, numberOfPeriods) - 1);

    let monthlyInterest = principle * interest;
    let monthlyPrinciple = monthlyPayments - monthlyInterest;


    //property tax/rate section to fix in future
    // if(this.mortgageInfo.propertyTax != this.mortgageInputs.propertyTax) {
      

    //   this.mortgageInfo.propertyTaxRate =
    //   (this.mortgageInputs.propertyTax / this.mortgageInputs.homePrice) * 100;
    //   // this.propertyTaxRateChanged.next(
    //     //   +this.mortgageInfo.propertyTaxRate.toFixed(2)
    //     // );
        
    //   this.mortgageInfo.propertyTax === this.mortgageInputs.propertyTax
      
        
    // } 
  
    
    // if(this.propertyTaxRate != this.mortgageInputs.propertyTaxRate ||  this.homePrice === this.mortgageInputs.homePrice) {

      
    //   let taxPercentage = this.mortgageInputs.propertyTaxRate / 100;
    //   this.taxes = this.mortgageInputs.homePrice * taxPercentage;
   
    //   this.taxesChanged.next(this.taxes);

    // }
    
  
    
    if(this.mortgageInputs.taxesAndInsurance[0] === 'taxes') {
      let taxes = this.mortgageInputs.propertyTax
   
      this.mortgageInfo.homeInsurance = this.mortgageInputs.homeInsurance / 12;
    
      monthlyPayments += taxes / 12;
      monthlyPayments += this.mortgageInfo.homeInsurance;
      this.includeTaxesAndInsurance = true;
      this.includeTaxesAndInsuranceChange.next(this.includeTaxesAndInsurance)
    }
    
    if(this.mortgageInputs.taxesAndInsurance.length === 0) {
      this.includeTaxesAndInsurance = false;
      this.includeTaxesAndInsuranceChange.next(this.includeTaxesAndInsurance)
    }

    this.mortgageInfo.propertyTax = this.mortgageInputs.propertyTax


    monthlyPayments += this.mortgageInputs.hoaDues;
    this.mortgageInfo.hoaDues = this.mortgageInputs.hoaDues;

    this.mortgageInfo.monthlyInterest = monthlyInterest;


    this.mortgageInfo.monthlyPrinciple = monthlyPrinciple;
   

    this.mortgageInfo.monthlyPayment = monthlyPayments.toFixed(2);
    this.mortgageInfoChange.next(this.mortgageInfo)
  }
}