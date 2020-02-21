import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from "ng-apexcharts";
import { StatService } from 'src/app/services/statservice/stat.service';

export type PopOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  popChartReady: boolean;

  constructor(private stat: StatService) {
    this.popChartReady = false;
  }

  ngOnInit(): void {
    this.getPopularMetrics();
  }

  @ViewChild("chart") chart: ChartComponent;
  public popOptions: Partial<PopOptions>;

  getPopularMetrics() {
    this.stat.getAdminMetrics('popular').subscribe(res => {
      this.renderPopChart(res.makes, res.counts);
    }, err => {
      console.log(err);
    })
  }
  
  renderPopChart(makes: string[], counts: number[]) {
    this.popOptions = {
      series: [
        {
          name: "Number of rentals",
          data: counts
        }
      ],
      chart: {
        height: 500,
        type: "bar"
      },
      title: {
        text: "Most Popular Brands"
      },
      xaxis: {
        categories: makes
      }
    };
    this.popChartReady = true;
  }
}