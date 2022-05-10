import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartModule } from 'primeng/chart';

import { CalculatorService } from '../calculator/calculator.service';
import { PieChartComponent } from './pie-chart.component';
import { of } from 'rxjs';
import { Calculator } from '../calculator/calculator.model';

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe('PieChartComponent', () => {
    let component: PieChartComponent;
    let fixture: ComponentFixture<PieChartComponent>;
    let service: CalculatorService;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ChartModule
            ],
            declarations: [PieChartComponent],
            providers: [{ provide: CalculatorService }],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PieChartComponent);
        service = TestBed.inject(CalculatorService);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init monthly principle with correct value for pie chart', () => {
        expect(component.monthlyPrinciple).toEqual(service.monthlyPrinciple)
    })

    it('should init monthly interest with correct value for pie chart', () => {
        expect(component.monthlyInterest).toEqual(service.monthlyInterest)
    })

    it('all values that rely on subscriptions should update when they are called', () => {
        
        const intialMortgageModel: Calculator = {
            homePrice: 250000,
            downPayment: 50000,
            downPaymentPercentage: 20,
            loanProgram: 30,
            interestRate: 5,
            propertyTax: 6000,
            propertyTaxRate: 1.5,
            homeInsurance: 0,
            hoaDues: 0,
            pmi: '',
            taxesAndInsurance: 'taxes',
          };
        service.updateInputs(intialMortgageModel)
        service.taxesChanged.next(intialMortgageModel.propertyTax)

        expect(component.monthlyPrinciple).toEqual(service.monthlyPrinciple)
        expect(component.monthlyInterest).toEqual(service.monthlyInterest)
        expect(component.hoa).toEqual(service.hoa)
        expect(0).toEqual(service.taxes)
        expect(component.homeInsurance).toEqual(service.homeInsurance)
    })
 

});
