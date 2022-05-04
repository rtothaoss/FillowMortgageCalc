import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { Calculator } from './calculator.model';



describe('CalcService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(CalculatorService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('monthly interest should return 833 so that pie-chart has correct initial value', () => {
        expect(service.monthlyInterest).toEqual(833)
    })

    it('monthly principle should return 240 so that pie-chart has correct initial value', () => {
        expect(service.monthlyPrinciple).toEqual(240)
    })

//    it('updateInputs should return the correct starting values: [250000, 50000, 20, 30, 5, 0, 1.5, 0, 0, "", ""]', () => {
//     const intialMortgageModel = new Calculator(250000, 50000, 20, 30, 5, 0, 1.5, 0, 0, "", "")
//     service.updateInputs = jest.fn()
    
    
//     expect(service.updateInputs).toHaveBeenCalledWith(intialMortgageModel)
// })



})