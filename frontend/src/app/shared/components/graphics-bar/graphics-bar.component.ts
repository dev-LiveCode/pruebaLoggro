import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { IStats } from '../../interfaces/utils.interfaces';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-graphics-bar',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './graphics-bar.component.html',
  styleUrl: './graphics-bar.component.scss'
})
export class GraphicsBarComponent implements OnInit {

  @Input() data: IStats[] = []

  hours: string[] = []
  counts: number[] = []

  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.data)

    this.hours = this.data.map((item) => item.hour)
    this.counts = this.data.map((item) => item.count)

    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: this.counts
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Grafico de barras"
      },
      xaxis: {
        categories: this.hours
      }
    };

    
  }



}
