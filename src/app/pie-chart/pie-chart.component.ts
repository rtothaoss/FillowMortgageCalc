import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { UIChart } from 'primeng/chart';
import { Subscription, withLatestFrom } from 'rxjs';
import { CalculatorService } from '../calculator/calculator.service';

Chart.register(ChartDataLabels)





@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: UIChart;
  private monthlyPaymentChangeSub: Subscription;
  monthlyPayments = '';
  private monthlyPrincipleChangeSub: Subscription;
  monthlyPrinciple: number;
  private monthlyInterestChangeSub: Subscription;
  monthlyInterest: number;
  private hoaChangeSub: Subscription;
  hoa: number
  
  

  public userAppData: any;

  public options: any;
  public userUsageHoursData: any;

  ngOnInit(): void {

    this.monthlyPrinciple = this.calcService.getMonthlyPrinciple();
    this.monthlyPrincipleChangeSub =
      this.calcService.monthlyPrincipleChanged.subscribe((value) => {
        this.monthlyPrinciple = +value;
      });

    this.monthlyInterest = this.calcService.getMonthlyInterest();
    this.monthlyInterestChangeSub =
      this.calcService.monthlyInterestChanged.subscribe((value) => {
        this.monthlyInterest = +value;
      });

    this.hoa = this.calcService.getHoaDues();
    this.hoaChangeSub = this.calcService.hoaChanged.subscribe((value) => {
      this.hoa = value
    })

    this.monthlyPayments = this.calcService.getMonthlyPayment();
    this.monthlyPaymentChangeSub =
      this.calcService.monthlyPaymentChanged.subscribe((value) => {
        this.monthlyPayments = value;
        this.constructChart();
      });
 

    this.constructChart();
  }

  constructor(private calcService: CalculatorService) {}

  constructChart() {

    let dataValues = [this.monthlyPrinciple.toFixed(0), this.monthlyInterest.toFixed(0)]
    let chartLabels: Array<string> = ['Principle', 'Interest']
    
    if(this.hoa > 0) {
      dataValues.push(this.hoa.toFixed(0))
      chartLabels.push('HOA')
    }
    
    this.userAppData = {
      labels: chartLabels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#4C5760', '#66635B', '#93A8AC'],
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
          backgroundColor:'rgba(0,0,0,0)',
          color: 'white',
          font: {
            weight: 'bold',
          },
          formatter: function(value: any, context: any) {
            
            return "$" + value
          }
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
  }
}
