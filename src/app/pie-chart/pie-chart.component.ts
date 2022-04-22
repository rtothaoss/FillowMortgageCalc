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

  constructor(private calcService: CalculatorService) {}

  ngOnInit(): void {

    this.monthlyPayments = this.calcService.getMonthlyPayment()
    this.monthlyPaymentChangeSub = this.calcService.monthlyPaymentChanged.subscribe((value) => {
      this.monthlyPayments = value;
    })

    this.chartOptions = {
      dataLabels: {
        // add this part to remove %
        enabled: true,
        formatter(value: any, opts: any): any {
          return '$' + opts.w.config.series[opts.seriesIndex];
        },
      },
      series: [this.principal, this.taxes, this.insurance, this.hoa],
      chart: {
        type: 'donut',
      },
      labels: ['P & I', 'Taxes', 'Insurance', 'HOA'],
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


  ngOnDestroy(): void {
      this.monthlyPaymentChangeSub.unsubscribe()
  }

}
