import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch'
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button';
// import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartModule } from 'primeng/chart'
import { PanelModule } from "primeng/panel"


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ButtonModule,
    ChartModule,
    PanelModule,
 
    
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
