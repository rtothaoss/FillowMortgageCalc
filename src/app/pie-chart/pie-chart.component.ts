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

  private includeTaxesAndInsuranceChange: Subscription

  private mortgageInfoChangeSub: Subscription;


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

    this.monthlyPrinciple = this.calcService.getMonthlyPrinciple();

    this.monthlyInterest = this.calcService.getMonthlyInterest();

    this.monthlyInterest = this.calcService.getMonthlyInterest();

    this.mortgageInfoChangeSub = this.calcService.mortgageInfoChange.subscribe((value) => {
      console.log(value)
      this.monthlyPrinciple = +value.monthlyPrinciple,
      this.monthlyInterest = +value.monthlyInterest,
      this.taxes = value.propertyTax
      this.homeInsurance = value.homeInsurance
      if (this.monthlyPayments != value.monthlyPayment) {
              this.monthlyPayments = value.monthlyPayment;
              this.constructChart();
            }
    })


      this.includeTaxesAndInsuranceChange =
      this.calcService.includeTaxesAndInsuranceChange.subscribe((value) => {
        console.log(value + ' inside sub')
        this.showTaxesAndInsurance = value;
       
      });

 

    this.constructChart();
  }

  constructor(private calcService: CalculatorService, private commonService: CommonService) {}

  constructChart() {
    let dataValues = [
      this.monthlyPrinciple.toFixed(0),
      this.monthlyInterest.toFixed(0),
    ];
    let chartLabels: Array<string> = ['Principal', 'Interest'];

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
    this.mortgageInfoChangeSub.unsubscribe();
    this.includeTaxesAndInsuranceChange.unsubscribe();
  }
}
