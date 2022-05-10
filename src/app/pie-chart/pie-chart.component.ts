import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { UIChart } from 'primeng/chart';
import { Subscription, withLatestFrom } from 'rxjs';
import { CalculatorService } from '../calculator/calculator.service';
import { CommonService } from '../shared/common.service';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: UIChart;
  private monthlyPaymentChangeSub: Subscription;
  private monthlyPrincipleChangeSub: Subscription;
  private monthlyInterestChangeSub: Subscription;
  private hoaChangeSub: Subscription;
  private taxesChangeSub: Subscription;
  private homeInsuranceChangeSub: Subscription;
  private includeTaxesAndInsuranceChanged: Subscription
  monthlyPayments = '';
  monthlyPrinciple: number;
  monthlyInterest: number;
  hoa: number;
  taxes: number;
  homeInsurance: number;
  showTaxesAndInsurance: boolean;
  

  public userAppData: any;

  public options: any;
  public userUsageHoursData: any;

  ngOnInit(): void {

    // this.commonService.aClickedEvent
    // .subscribe((data:string) => {
    //   console.log('Event message from Component A: ' + data);
    //   this.showTaxesAndInsurance = !this.showTaxesAndInsurance
    //     this.constructChart();
    // });

    this.monthlyPrinciple = this.calcService.getMonthlyPrinciple();
    this.monthlyPrincipleChangeSub =
      this.calcService.monthlyPrincipleChanged.subscribe((value) => {
        // console.log(this.monthlyPrinciple);
        this.monthlyPrinciple = +value;
      });

    this.monthlyInterest = this.calcService.getMonthlyInterest();
    this.monthlyInterestChangeSub =
      this.calcService.monthlyInterestChanged.subscribe((value) => {
        // console.log(this.monthlyInterest);
        this.monthlyInterest = +value;
      });

    this.hoaChangeSub = this.calcService.hoaChanged.subscribe((value) => {
      this.hoa = value;
    });
    this.taxesChangeSub = this.calcService.taxesChanged.subscribe((value) => {
      this.taxes = value;
      console.log(this.taxes)
    });
    this.homeInsuranceChangeSub =
      this.calcService.homeInsuranceChanged.subscribe((value) => {
        this.homeInsurance = value;
      });
      this.includeTaxesAndInsuranceChanged =
      this.calcService.includeTaxesAndInsuranceChanged.subscribe((value) => {
        console.log(value + ' inside sub')
        this.showTaxesAndInsurance = value;
        // this.constructChart();
       
      });

    this.monthlyPayments = this.calcService.getMonthlyPayment();
    this.monthlyPaymentChangeSub =
      this.calcService.monthlyPaymentChanged.subscribe((value) => {
        if (this.monthlyPayments != value) {
          this.monthlyPayments = value;
          this.constructChart();
        }
      });

    this.constructChart();
  }

  constructor(private calcService: CalculatorService, private commonService: CommonService) {}

  constructChart() {
    let dataValues = [
      this.monthlyPrinciple.toFixed(0),
      this.monthlyInterest.toFixed(0),
    ];
    let chartLabels: Array<string> = ['Principle', 'Interest'];

    if (this.hoa > 0) {
      dataValues.push(this.hoa.toFixed(0));
      chartLabels.push('HOA');
    }
    
    if (this.taxes > 0 && this.showTaxesAndInsurance) {
      let taxes = (this.taxes / 12).toFixed(0)
      dataValues.push(taxes);
      chartLabels.push('Taxes');
    }

    
    if (this.homeInsurance > 0 && this.showTaxesAndInsurance) {
      dataValues.push(this.homeInsurance.toFixed(0));
      chartLabels.push('Insurance');
    }

    this.userAppData = {
      labels: chartLabels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            '#5CC8FF',
            '#93867F',
            '#343633',
            '#7D70BA',
            '#DEC1FF',
          ],
        },
      ],
    };

    this.options = {
      //display labels on data elements in graph
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'center',
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0)',
          color: 'white',
          font: {
            weight: 'bold',
          },
          formatter: function (value: any, context: any) {
            return '$' + value;
          },
        },
        // display chart title
        title: {
          display: true,
          fontSize: 16,
        },
        legend: {
          position: 'bottom',
        },
      },
    };
  }

  onUpdate() {
    console.log('it works');
  }

  ngOnDestroy(): void {
    this.monthlyPaymentChangeSub.unsubscribe();
    this.monthlyInterestChangeSub.unsubscribe();
    this.monthlyPrincipleChangeSub.unsubscribe();
    this.hoaChangeSub.unsubscribe();
    this.taxesChangeSub.unsubscribe();
    this.homeInsuranceChangeSub.unsubscribe();
    this.includeTaxesAndInsuranceChanged.unsubscribe();
  }
}
