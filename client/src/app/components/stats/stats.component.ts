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
  ApexMarkers,
  ApexYAxis,
  ApexLegend
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

export type CarbonOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  popChartReady: boolean;
  carbonChartReady: boolean;

  constructor(private stat: StatService) {
    this.popChartReady = false;
    this.carbonChartReady = false;
  }

  ngOnInit(): void {
    this.getPopularMetrics();
    this.getCarbonMetrics();
  }

  @ViewChild("chart") chart: ChartComponent;
  public popOptions: Partial<PopOptions>;
  public carbonOptions: Partial<CarbonOptions>;

  getPopularMetrics() {
    this.stat.getAdminMetrics('popular').subscribe(res => {
      this.renderPopChart(res.makes, res.counts);
    }, err => {
      console.log(err);
    })
  }

  getCarbonMetrics() {
    this.stat.getAdminMetrics('footprint').subscribe(res => {
      console.log(res);
      this.renderCarbonChart(res.months, res.emissions);
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
        height: 350,
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

  renderCarbonChart(months, emissions){
    this.carbonOptions = {
      series: [
        {
          name: "Carbon Footprint",
          data: emissions
        },
        {
          name: "Expected Carbon Footprint",
          data: [520, 650, 1130, 3297]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: months,
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Carbon Emmissions"
        },
        min: 0,
        max: 10000
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
    this.carbonChartReady = true;
  }
}