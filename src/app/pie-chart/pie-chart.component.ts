import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApexDataLabels, ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { CalculatorService } from '../calculator/calculator.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  labels: any;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  principal: number = 1299;
  taxes: number = 333;
  insurance: number = 105;
  hoa: number = 200;
  private monthlyPaymentChangeSub: Subscription
  monthlyPayments = ''
  private monthlyPrincipleChangeSub: Subscription
  monthlyPrinciple: number;
  private monthlyInterestChangeSub: Subscription
  monthlyInterest: number;

  constructor(private calcService: CalculatorService) {}

  ngOnInit(): void {

    this.monthlyPayments = this.calcService.getMonthlyPayment()
    this.monthlyPaymentChangeSub = this.calcService.monthlyPaymentChanged.subscribe((value) => {
      this.monthlyPayments = value;
    })

    this.monthlyPrinciple = this.calcService.getMonthlyPrinciple()
    this.monthlyPrincipleChangeSub = this.calcService.monthlyPrincipleChanged.subscribe((value) => {
      this.monthlyPrinciple = +value;
    })
    this.monthlyInterest = this.calcService.getMonthlyInterest()
    this.monthlyInterestChangeSub = this.calcService.monthlyInterestChanged.subscribe((value) => {
      this.monthlyInterest = +value;
    })

    this.chartOptions = {
      dataLabels: {
        enabled: true,
        formatter(value: any, opts: any): any {
          return '$' + opts.w.config.series[opts.seriesIndex];
        },
      },
      series: [this.monthlyPrinciple, this.monthlyInterest],
      chart: {
        type: 'donut',
      },
      labels: ['Principle', 'Interest'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  public updateSeries() {
    this.chartOptions.series = [{
      data: [23, 44,]
    }];
  }


  ngOnDestroy(): void {
      this.monthlyPaymentChangeSub.unsubscribe()
      this.monthlyInterestChangeSub.unsubscribe()
      this.monthlyPrincipleChangeSub.unsubscribe()
  }

}
