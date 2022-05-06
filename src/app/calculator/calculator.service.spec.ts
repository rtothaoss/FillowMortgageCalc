import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { Calculator } from './calculator.model';

describe('CalcService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('monthlyPayment, monthlyPrinciple, and monthlyInterest should all return the correct values on startup', () => {
    const intialMortgageModel: Calculator = {
      homePrice: 250000,
      downPayment: 50000,
      downPaymentPercentage: 20,
      loanProgram: 30,
      interestRate: 5,
      propertyTax: 0,
      propertyTaxRate: 1.5,
      homeInsurance: 0,
      hoaDues: 0,
      pmi: '',
      taxesAndInsurance: '',
    };
    service.updateInputs(intialMortgageModel);
    expect(service.homePrice).toEqual(250000)
    expect(service.monthlyPayment).toEqual('1073.64')
    expect(service.monthlyPrinciple).toEqual(240.30991269094613) //maybe use toFixed(0) to make this look nicer
    expect(service.monthlyInterest).toEqual(833.3333333333334)
  });


});
