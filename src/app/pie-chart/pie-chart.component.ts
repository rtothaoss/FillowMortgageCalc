import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { UIChart } from 'primeng/chart';
import { Subscription } from 'rxjs';
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
    this.userAppData = {
      labels: ['Principle', 'Interest'],
      datasets: [
        {
          data: [this.monthlyPrinciple, this.monthlyInterest],
          backgroundColor: ['#2F4858', '#F6AE2D'],
        },
      ],
    };

    this.options = {
      //display labels on data elements in graph
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: '#33658A',
          color: 'white',
          font: {
            weight: 'bold',
          },
          formatter: function(value: any, context: any) {
            console.log(value)
            return "$" + value.toFixed(2)
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
  }
}
